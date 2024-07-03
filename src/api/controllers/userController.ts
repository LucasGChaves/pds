import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../../infrastructure/adapters/repository/userRepository";
import { UserService } from "../../application/usecases/userService";
import { AddressRepository } from "../../infrastructure/adapters/repository/addressRepository";
import { AddressService } from "../../application/usecases/addressService";
import { validationResult } from "express-validator";
import { HttpError } from "../middlewares/errors";
import jwt from "jsonwebtoken";
import { Auth } from "../middlewares/auth";
import { User } from "../../domain/entities/user";
import { Roles } from "../../infrastructure/rolesDictionary";
import { Address } from "../../domain/entities/address";

const auth = new Auth();

const userRepository = new UserRepository();
const addressRepository = new AddressRepository();
const userService = new UserService(userRepository);
const addressService = new AddressService(addressRepository);

export class UserController {
    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const errors = validationResult(req);
            
            if(errors.isEmpty()) {
                let uncryptedPassword = req.body.password;

                let body:any = {...req.body};
                const addressData = req.body && req.body.address;
                
                delete body.address;

                const userData = body;

                const user = await userService.createUser(userData, addressData);
                
                if(req.cookies && Object.keys(req.cookies).length) {
                    req.cookies = {};
                }

                if(!user) {
                    return next(new HttpError("Ocorreu um erro ao criar o usuário.", 500));
                }
                
                req.body.identifier = user.email || user.cpf;
                req.body.password = uncryptedPassword;
                auth.login(req, res, next, true);
            }
            else {
                next(new HttpError(errors.array().toString(), 422));
            }
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.user && req.user.id;

            if(!userId) {
                return next(new HttpError("Não foi possível obter o usuário especificado.", 500));
            }

            const address = req.body && req.body.address;

            if(address) {

                const originalAddress = await addressService.findByUserId(userId);
                const originalAdressCopy: Partial<Address> = {...originalAddress};

                if(verifyIfAddressChanged(address, originalAdressCopy)) {
                    const updatedAddress = await addressService.updateAddress(userId, address);
    
                    if(!updatedAddress) {
                        return next(new HttpError("Não foi possível atualizar o endereço especificado.", 500));
                    }
                }

            }

            let updatedData:any = {...req.body};
            delete updatedData.address;
            
            if(userId && Object.keys(updatedData).length) {

                const updatedUser = await userService.updateUser(userId, updatedData);
                let updatedUserCopy:any = {...updatedUser};
                delete updatedUserCopy.password;

                res.status(200).send("Usuário atualizado com sucesso.");
            }
            else {
                return next(new HttpError("Ocorreu um erro ao editar usuário. Tente novamente.", 500));
            }

        } catch (err) {
            next(err);
        }
    }

    getUserById(getLoggedUserOwnProfile = false) {
        return async function(req: Request, res: Response, next: NextFunction): Promise<void> {
            try {
                let userId = null;

                if(getLoggedUserOwnProfile) {
                    userId = req.user && req.user.id;
                }
                else {
                    userId = req.params && Number(req.params.id);
                }

                if(!userId) {
                    return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
                }

                const user = await userService.findById(userId);

                if(!user) {
                    return next(new HttpError("Não foi possível recuperar o perfil especificado. Tente novamente.", 500));
                }

                res.status(200).json(user);
            } catch (err) {
                next(err);
            }
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const userId = req.user && req.user.id;

            if(!userId) {
                return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
            }

            const isUserDeleted = await userService.deleteUser(userId);

            if(!isUserDeleted) {
                return next(new HttpError("Ocorreu um erro ao deletar o usuário. Tente novamente.", 500));
            }
            

            res.clearCookie('token').status(204).send("Usuário deletado com sucesso.");
        } catch (err) {
            next(err);
        }
    }

    async getUserPets(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const userId = req.user && req.user.id;

            if(!userId) {
                return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
            }

            const pets = await userService.getMyPets(userId);

            if(!pets) {
                return next(new HttpError("Nenhum pet foi encontrado.", 500));
            }

            res.status(200).json(pets);
        } catch (err) {
            next(err);
        }
    }

    async getUserAppointments(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {

            const userId = req.user && req.user.id;
            const userRole = req.user && req.user.roleId;
            console.log("userId: " + userId);

            if(!userId) {
                return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
            }

            const appointments = await userService.getMyAppointments(userId, userRole!);

            if(!appointments) {
                return next(new HttpError("Nenhuma consulta foi encontrada.", 400));
            }

            res.status(200).json(appointments);
        } catch (err) {
            next(err);
        }
    }

    async getUserExams(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const userId = req.user && req.user.id;
            const userRole = req.user && req.user.roleId;

            if(!userId) {
                return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
            }

            const exams = await userService.getMyExamRequests(userId, userRole!);

            if(!exams) {
                return next(new HttpError("Nenhum pedido de exame foi encontrado.", 400));
            }

            res.status(200).json(exams);
        } catch(err) {
            next(err);
        }
    }

    async getUserVaccines(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const userId = req.user && req.user.id;
            const userRole = req.user && req.user.roleId;

            if(!userId) {
                return next(new HttpError("Não foi possível obter o perfil do usuário especificado. Faça login novamente.", 500));
            }

            const vaccines = await userService.getMyVaccines(userId, userRole!);

            if(!vaccines) {
                return next(new HttpError("Nenhuma vacina foi encontrada.", 400));
            }

            res.status(200).json(vaccines);
        } catch(err) {
            next(err);
        }
    }

    async getVets(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const city = req.body && req.body.city;
            const district = req.body && req.body.district;

            const vets = await userService.searchForVet(city, district);

            if(!vets) {
                return next(new HttpError("Nenhum veterinário foi encontrado.", 400));
            }

            res.status(200).json(vets);
        } catch(err) {
            next(err);
        }
    }

    async getVetPatients(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const userId = req.user && req.user.id;
            const userRoleId = req.user && req.user.roleId;
        
            if(!userRoleId || userRoleId === Number(Roles.owner)) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const patients = await userService.getMyPatients(userId!);

            if(!patients) {
                return next(new HttpError("Nehum paciente foi encontrado.", 400));
            }

            res.status(200).json(patients);
        } catch(err) {
            next(err);
        }
    }

    async getVetAvailableDates(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const vetId = req.params && Number(req.params.id);
            const userId = req.user && Number(req.user.roleId);

            if(!vetId) {
                return next(new HttpError("É necessário informar um veterinário.", 400));
            }
            if(!userId) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const dates = await userService.getAvailableAppointmentDatesForOwner(vetId);

            if(!dates) {
                return next(new HttpError("Nenhuma data disponível foi encontrada.", 400));
            }

            res.status(200).json(dates);
        } catch(err) {
            next(err);
        }
    }

    async getVetAvailableTimes(req: Request, res: Response, next: NextFunction): Promise <void> {
        try {
            const vetId = req.params && Number(req.params.id);
            const userId = req.user && Number(req.user.roleId);

            if(!vetId) {
                return next(new HttpError("É necessário informar um veterinário.", 400));
            }
            if(!userId) {
                return next(new HttpError("Sem autorização para acessar.", 401));
            }

            const date = req.params && req.params.date;

            if(!date) {
                return next(new HttpError("É necessário informar uma data.", 400));
            }

            const times = await userService.getAvailableAppointmentTimesForOwner(vetId, date);

            if(!times) {
                return next(new HttpError("Nenhum horário foi encontrado.", 400));
            }

            res.status(200).json(times);
        } catch(err) {
            next(err);
        }
    }

}

function verifyIfAddressChanged(newAddressObject: any, oldAddressObject: any) {
    let changed = false;
    Object.keys(oldAddressObject).forEach(key => {
        if(newAddressObject[key] && (oldAddressObject[key] !== newAddressObject[key])) {
            changed = true;
            return;
        }
    });
    return changed;
}