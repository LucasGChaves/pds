import { Address } from "../../domain/entities/address";
import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/ports/userRepositoryInterface";
import { AppointmentRepository } from "../../infrastructure/adapters/repository/appointmentRepository";
import { AppointmentService } from "./appointmentService";
import { ExamRequestRepository } from "../../infrastructure/adapters/repository/examRequestRepository";
import { ExamRequestService } from "./examRequestService";
import { VaccineRepository } from "../../infrastructure/adapters/repository/vaccineRepository";
import { VaccineService } from "./vaccineService";
import { Pet } from "../../domain/entities/pet";
import { PetRepository } from "../../infrastructure/adapters/repository/petRepository";
import { PetService } from "./petService";
import bcrypt from "bcrypt";
import { HttpError } from "../../api/middlewares/errors";
import { Roles } from "../../infrastructure/rolesDictionary";
import { RoleRepository } from "../../infrastructure/adapters/repository/roleRepository";
import { AddressRepository } from "../../infrastructure/adapters/repository/addressRepository";
import { AddressService } from "./addressService";
import { UserReturnType } from "../../infrastructure/types/userType";
import { AppointmentReturnType } from "../../infrastructure/types/appointment";
import { ExamRequestReturnType } from "../../infrastructure/types/examRequest";
import { VaccineReturnType } from "../../infrastructure/types/vaccine";
import { PetReturnType } from "../../infrastructure/types/petType";

const petRepository = new PetRepository();
const petService = new PetService(petRepository);

const addressRepository = new AddressRepository();
const addressService = new AddressService(addressRepository);

const appointmentRepository = new AppointmentRepository();
const appointmentService = new AppointmentService(appointmentRepository);

const vaccineRepository = new VaccineRepository();
const vaccineService = new VaccineService(vaccineRepository);

const examRequestRepository = new ExamRequestRepository();
const examRequestService = new ExamRequestService(examRequestRepository);

const roleRepository = new RoleRepository();

export class UserService {
    constructor(private userRepository: UserRepositoryInterface) {}

    async createUser(user: Partial<User>, address: Partial<Address>): Promise<UserReturnType> {
      const hashedPassword = await bcrypt.hash(user.password!, 10);
      user.password = hashedPassword;
      const createdAddress = await addressService.createAddress(address);
      const createdUser = await this.userRepository.createUser(user);
      const userCopy:any = {...createdUser};

      return {...userCopy, address: createdAddress};
    }
    
    async updateUser(userId: number, updatedData: Partial<User>): Promise<UserReturnType | undefined> {
      if(updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        updatedData.password = hashedPassword;
      }

      const updatedUser = await this.userRepository.updateUser(userId, updatedData);

      if(!updatedUser) {
        throw new HttpError("Não foi possível encontrar o usuário desejado.", 400);
      }
      
      const address = await addressService.findByUserId(updatedUser.id);
      const updatedUserCopy: any = {...updatedUser};

      return {...updatedUserCopy, address: address};
    }

    async getUserAddress(userId: number): Promise <Address | undefined> {
      return await this.userRepository.getUserAddress(userId);
    }

    async deleteUser(userId: number): Promise <boolean | undefined> {
      let deleted = false;
      try {
        await this.userRepository.deleteUser(userId);
        deleted = true;
      } catch (err: any) {
        throw new HttpError(err.message, 500);
      }

      return deleted;
    }

    async findByEmail(email: string): Promise<UserReturnType | undefined> {
      const user = await this.userRepository.findByEmail(email);
      const role = await roleRepository.findById(Number(user?.roleId));
      const address = await addressRepository.findByUserId(user!.id);
      let completeUserObject: any = {...user, role: role, address: address};
      delete completeUserObject.password;
      return completeUserObject;
    }
  
    async findByCpf(cpf: string): Promise<UserReturnType | undefined> {
      const user = await this.userRepository.findByCpf(cpf);
      const role = await roleRepository.findById(Number(user?.roleId));
      const address = await addressRepository.findByUserId(user!.id);
      let completeUserObject: any = {...user, role: role, address: address};
      delete completeUserObject.password;
      return completeUserObject;
    }

    async findById(id: number): Promise<UserReturnType | undefined> {
      const user = await this.userRepository.findById(id);
      const role = await roleRepository.findById(Number(user?.roleId));
      const address = await addressRepository.findByUserId(user!.id);
      let completeUserObject: any = {...user, role: role, address: address};
      delete completeUserObject.password;
      return completeUserObject;
    }


    async getMyAppointments(id: number, roleId: number): Promise<AppointmentReturnType[] | undefined> {
      const appointments = await this.findAllAppointmentsByUserId(id);

      if(!appointments) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhuma consulta relacionada ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhuma consulta relacionada ao veterinário especificado.", 404);
      }

      return Promise.all(appointments.map(async appointment => {
        const vet = await this.findById(appointment.vetId);
        const pet = await petService.findById(Number(appointment.petId));

        if(pet) {
          const owner = await this.findById(pet?.ownerId);
          const completePetObject: PetReturnType = {...pet, owner: owner!};

          return {...appointment!, pet: completePetObject!, vet: vet!};
        }

        return {...appointment!, vet: vet!};        
      }));
    }

    async getMyExamRequests(id: number, roleId: number): Promise<ExamRequestReturnType[] | undefined> {
      const examRequests = await this.findAllExamRequestsByUserId(id);

      if(!examRequests) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhum pedido de exame  relacionado ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhum pedido de exame  relacionado ao veterinário especificado.", 404);
      }

      return Promise.all(examRequests.map(async examRequest => {
        const vet = await this.findById(examRequest.vetId);
        const pet = await petService.findById(examRequest.petId);
        const owner = await this.findById(pet?.ownerId!);
        const completePetObject: PetReturnType = {...pet!, owner: owner!};

        return {...examRequest!, pet: completePetObject!, vet: vet!};
      }));
    }

    async getMyVaccines(id: number, roleId: number): Promise<VaccineReturnType[] | undefined> {
      const vaccines = await this.findAllVaccinesByUserId(id);

      if(!vaccines) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhuma vacina relacionada ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhuma vacina relacionada ao veterinário especificado.", 404);
      }
      
      return Promise.all(vaccines.map(async vaccine => {
        const pet = await petService.findById(vaccine.petId);
        const vet = await this.findById(vaccine.vetId);
        const owner = await this.findById(pet?.ownerId!);
        const completePetObject: PetReturnType = {...pet!, owner: owner!};

        return {...vaccine!, pet: completePetObject!, vet: vet!};
      }));
    }

    //owner exclusive
    async getMyPets(id: number): Promise<Pet[] | undefined> {
      const pets = await petService.findAllByUserId(id);
      return pets;
    }

    async searchForVet(city?: string, district?: string): Promise<UserReturnType[] | undefined> {
      let vets = null;
      const role = Number(Roles.vet);
      let filters: any = {};

      if(city) {
        filters.city = city;
      }
      if(district) {
        filters.district = district;
      }

      if(!city && !district) {
        vets = await this.userRepository.findAllByRole(role);
      }
      else {
        vets = await this.userRepository.findAllByRoleAndFilters(role, filters);
      }
      
      if(!vets) {
        throw new HttpError("Nenhum veterinário foi encontrado.", 404);
      }

      return Promise.all(vets.map(async vet => {
        const address = await addressService.findByUserId(vet.id);
        const role = await roleRepository.findById(vet.roleId);

        return {...vet!, address: address!, role: role!};
      }));
    }

    async getAvailableAppointmentDatesForOwner(vetId: number, roleId: number): Promise<Date[] | undefined> {
      const appointments = await this.findAllAppointmentsAvailableForOwnerByUserId(vetId);
      const appointmentsDates = appointments?.map(appointment => appointment.appointmentDate);
      const appointmentDatesFiltered = appointmentsDates?.filter((value, index) => appointmentsDates.indexOf(value) === index);

      return appointmentDatesFiltered;
    }

    async getAvailableAppointmentTimesForOwner(vetId: number, appointmentDate: Date): Promise<any | undefined> {
      const appointments = await this.findAllAppointmentsAvailableForOwnerByUserIdAndDate(vetId, appointmentDate);
      const appointmentsTimes = appointments?.map(appointment => ({id: appointment.id, appointmentTime: appointment.appointmentTime}));

      return appointmentsTimes;
    }

    async scheduleAppointmentForOwner(appointmentId: number, petId: number): Promise<AppointmentReturnType | undefined> {
      const updatedAppointment = await appointmentService.updateAppointment(appointmentId, {scheduled: true, petId: petId});

      const vet = await this.findById(updatedAppointment?.vetId!);
      const pet = await petService.findById(petId);
      const owner = await this.findById(pet?.ownerId!);
      const completePetObject: PetReturnType = {...pet!, owner: owner!};

      return {...updatedAppointment!, pet: completePetObject!, vet: vet!};
    }

    async cancelAppointmentAsOwner(appointmentId: number): Promise <AppointmentReturnType | undefined> {
      const updatedAppointment = await appointmentService.updateAppointment(appointmentId, {scheduled: false, petId: undefined});
      const vet = await this.findById(updatedAppointment?.vetId!);
      return {...updatedAppointment!, vet: vet!};
    }

    //vet exclusive
    async getMyPatients(id: number): Promise<Pet[] | undefined> {
      const vaccines =  await this.getMyVaccines(id, Number(Roles.vet));
      const examRequests = await this.getMyExamRequests(id, Number(Roles.vet));
      const appointments = await this.getMyAppointments(id, Number(Roles.vet));
      
      let petIdsFromVaccines = [];
      let petIdsFromExamRequests = [];
      let petIdsFromAppointments = [];
      let petIdsArr: number[] = [];

      if(vaccines && vaccines.length) {
        petIdsFromVaccines = vaccines.map(vaccine => vaccine.petId);
        petIdsArr = petIdsArr.concat(petIdsFromVaccines);
      }

      if(examRequests && examRequests.length) {
        petIdsFromExamRequests = examRequests.map(examRequest => examRequest.petId);
        petIdsArr = petIdsArr.concat(petIdsFromExamRequests);
      }

      if(appointments && appointments.length) {
        petIdsFromAppointments = appointments.map(appointment => appointment.petId!);
        petIdsArr = petIdsArr.concat(petIdsFromAppointments);
      }

      const petIdsArrWithNoRepetition = petIdsArr.filter((value, index) => petIdsArr.indexOf(value) === index);
      const patients = await petService.findAllSpecifiedByIds(petIdsArrWithNoRepetition);

      if(!patients) {
        throw new HttpError("Não foi possível encontrar nenhum paciente para o veterinário especificado.", 404);
      }

      return await Promise.all(patients.map(async patient => {
        const owner = await this.findById(patient.ownerId);
        const completePetObject: PetReturnType = {...patient!, owner: owner!}

        return completePetObject;
      }));
    }

    async scheduleAppointmentAsVet(vetId: number, appointmentDate: Date, appointmentTime: string): Promise<AppointmentReturnType | undefined> {
      const appointments = await this.findAllAppointmentsByUserId(vetId);
      let dateAndTimeAlreadyTaken = false;
      
      appointments?.map(appointment => {
        if(appointment.appointmentDate === appointmentDate && appointment.appointmentTime === appointmentTime) {
          dateAndTimeAlreadyTaken = true;
          return;
        }
      });

      if(dateAndTimeAlreadyTaken) {
        throw new HttpError("O horário escolhido já está registrado.", 400);
      }
      const newAppointment = {
        appointmentDate: appointmentDate,
        appointmentTime: appointmentTime,
        scheduled: false,
        vetId: vetId
      };

      const createdAppointment = await appointmentService.createAppointment(newAppointment);
      const vet = await this.findById(vetId);

      return {...createdAppointment, vet: vet!};
    }

    async cancelAppointmentAsVet(appointmentId: number): Promise<boolean | undefined> {
      let deleted = false;
      try {
        await appointmentService.deleteAppointment(appointmentId);
        deleted = true;
      } catch (err: any) {
        throw new HttpError(err.message, 500);
      }

      return deleted;
    }

    async findAppointmentByIdAndReturnFullObject(id: number): Promise<AppointmentReturnType | undefined> {
      const appointment = await appointmentService.findById(id);

      if(!appointment) {
        throw new HttpError("Não foi possível encontrar a consulta desejada.", 404);
      }

      const vet = await this.findById(appointment.vetId);

      if(appointment.petId) {
        const pet = await petService.findById(appointment.petId);
        const owner = await this.findById(pet?.ownerId!);
        const completePetObject: PetReturnType = {...pet!, owner: owner!};
        return {...appointment, pet: completePetObject!, vet: vet!};
      }
      return {...appointment, vet: vet!};
    }

    async findAllAppointmentsByUserId(userId: number): Promise<AppointmentReturnType[] | undefined> {
      const appointments = await appointmentRepository.findAllByUserId(userId);

      if(!appointments) {
          throw new HttpError("Não foi possível encontrar nenhuma consulta.", 404);
      }

      return Promise.all(appointments.map(async appointment => {
          const vet = await this.findById(appointment.vetId);

          if(appointment.petId) {
            const pet = await petService.findById(appointment.petId!);
            const owner = await this.findById(pet?.ownerId!);
            const completePetObject: PetReturnType = {...pet!, owner: owner!};
            return {...appointment!, pet: completePetObject!, vet: vet!};
          }
          return {...appointment!, vet: vet!};
      }));
  }

  async findAllAppointmentsAvailableForOwnerByUserId(userId: number): Promise<AppointmentReturnType[] | undefined> {
    const appointments = await appointmentRepository.findAllAvailableForOwnerByUserId(userId);

    if(!appointments) {
        throw new HttpError("Não foi possível encontrar nenhuma consulta.", 404);
    }

    return Promise.all(appointments.map(async appointment => {
        const vet = await this.findById(Number(appointment.vetId));

        if(appointment.petId) {
          const pet = await petService.findById(Number(appointment.petId));
          const owner = await this.findById(pet?.ownerId!);
          const completePetObject: PetReturnType = {...pet!, owner: owner!};
          return {...appointment!, pet: completePetObject!, vet: vet!};
        }
        return {...appointment!, vet: vet!};
    }));
}

  async findAllAppointmentsAvailableForOwnerByUserIdAndDate(userId: number, appointmentDate: Date): Promise <AppointmentReturnType[] | undefined> {
    const appointments = await appointmentRepository.findAllAvailableForOwnerByUserIdAndDate(userId, appointmentDate);

    if(!appointments) {
        throw new HttpError("Não foi possível encontrar nenhuma consulta.", 404);
    }

    const appointmentsCopy = Promise.all(appointments.map(async appointment => {
        let pet = await petService.findById(Number(appointment.petId));
        let vet = await this.findById(Number(appointment.vetId));

        let appointmentCopy: any = {...appointment, pet: pet, vet: vet};
        return appointmentCopy;
    }));

    return appointmentsCopy;
  }
  
  async findVaccineByIdAndReturnFullObject(vaccineId: number): Promise<VaccineReturnType | undefined> {
    const vaccine = await vaccineService.findById(vaccineId);
    const vet = await this.findById(vaccine?.vetId!);
    const pet = await petService.findById(vaccine?.petId!);
    const owner = await this.findById(pet?.ownerId!);
    const completePetObject = {...pet!, owner: owner!};
    return {...vaccine!, pet: completePetObject!, vet: vet!};
  }

  async findAllVaccinesByUserId(userId: number): Promise<VaccineReturnType[] | undefined> {
    const vaccines = await vaccineRepository.findAllByUserId(userId);

    if(!vaccines) {
        throw new HttpError("Não foi possível encontrar nenhuma vacina.", 404);
    }

    return Promise.all(vaccines.map(async vaccine => {
      const vet = await this.findById(vaccine?.vetId!);
      const pet = await petService.findById(vaccine?.petId!);
      const owner = await this.findById(pet?.ownerId!);
      const completePetObject = {...pet!, owner: owner!};
      return {...vaccine!, pet: completePetObject!, vet: vet!};
    }));
  }

  async findAllVaccinesByPetId(petId: number): Promise<VaccineReturnType[] | undefined> {
    const vaccines = await vaccineRepository.findAllByPetId(petId);

    if(!vaccines) {
        throw new HttpError("Não foi possível encontrar nenhuma vacina.", 404);
    }

    return Promise.all(vaccines.map(async vaccine => {
      const vet = await this.findById(vaccine?.vetId!);
      const pet = await petService.findById(vaccine?.petId!);
      const owner = await this.findById(pet?.ownerId!);
      const completePetObject = {...pet!, owner: owner!};
      return {...vaccine!, pet: completePetObject!, vet: vet!};
    }));
  }

  async findExamRequestByIdAndReturnFullObject(id: number): Promise<ExamRequestReturnType | undefined> {
    const examRequest = await examRequestService.findById(id);
    const vet = await this.findById(examRequest?.vetId!);
    const pet = await petService.findById(examRequest?.petId!);
    const owner = await this.findById(pet?.ownerId!);
    const completePetObject: PetReturnType = {...pet!, owner: owner!};
    return {...examRequest!, pet: completePetObject!, vet: vet!};
  }

  async findAllExamRequestsByUserId(userId: number): Promise<ExamRequestReturnType[] | undefined> {
    const examRequests = await examRequestRepository.findAllByUserId(userId);

    if(!examRequests) {
        throw new HttpError("Não foi possível encontrar nenhum pedido de exame.", 404);
    }

    return Promise.all(examRequests.map(async examRequest => {
      const vet = await this.findById(examRequest?.vetId!);
      const pet = await petService.findById(examRequest?.petId!);
      const owner = await this.findById(pet?.ownerId!);
      const completePetObject: PetReturnType = {...pet!, owner: owner!};
      return {...examRequest!, pet: completePetObject!, vet: vet!};
    }));
  }

  async findExamRequestByAppointmentId(appointmentId: number): Promise<ExamRequestReturnType | undefined> {
    const examRequest = await examRequestRepository.findByAppointmentId(appointmentId);

    if(!examRequest) {
        throw new HttpError("Não foi possível encontrar o pedido de exame desejado.", 404);
    }

    const vet = await this.findById(examRequest?.vetId!);
    const pet = await petService.findById(examRequest?.petId!);
    const owner = await this.findById(pet?.ownerId!);
    const completePetObject: PetReturnType = {...pet!, owner: owner!};
    return {...examRequest!, pet: completePetObject!, vet: vet!};
  }
}