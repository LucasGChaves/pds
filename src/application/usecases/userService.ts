import { Address } from "../../domain/entities/address";
import { User } from "../../domain/entities/user";
import { UserRepositoryInterface } from "../../domain/ports/userRepositoryInterface";
import { Appointment } from "../../domain/entities/appointment";
import { AppointmentRepository } from "../../infrastructure/adapters/repository/appointmentRepository";
import { AppointmentService } from "./appointmentService";
import { ExamRequest } from "../../domain/entities/examRequest";
import { ExamRequestRepository } from "../../infrastructure/adapters/repository/examRequestRepository";
import { ExamRequestService } from "./examRequestService";
import { Vaccine } from "../../domain/entities/vaccine";
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

    async createUser(user: Partial<User>, address: Partial<Address>): Promise<User> {
      const hashedPassword = await bcrypt.hash(user.password!, 10);
      user.password = hashedPassword;
      await addressService.createAddress(address);
      return await this.userRepository.createUser(user);
    }
    
    async updateUser(userId: number, updatedData: Partial<User>): Promise<User | undefined> {
      if(updatedData.password) {
        const hashedPassword = await bcrypt.hash(updatedData.password, 10);
        updatedData.password = hashedPassword;
      }
      return await this.userRepository.updateUser(userId, updatedData);
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

    async findByEmail(email: string): Promise<User | undefined> {
      const user = await this.userRepository.findByEmail(email);
      const role = await roleRepository.findById(Number(user?.roleId));
      let userWithRole: any = {...user, role: role};
      delete userWithRole.password;
      return userWithRole;
    }
  
    async findByCpf(cpf: string): Promise<User | undefined> {
      const user = await this.userRepository.findByCpf(cpf);
      const role = await roleRepository.findById(Number(user?.roleId));
      let userWithRole: any = {...user, role: role};
      delete userWithRole.password;
      return userWithRole;
    }

    async findById(id: number): Promise<User | undefined> {
      const user = await this.userRepository.findById(id);
      const role = await roleRepository.findById(Number(user?.roleId));
      let userWithRole: any = {...user, role: role};
      delete userWithRole.password;
      return userWithRole;
    }


    async getMyAppointments(id: number, roleId: number): Promise<Appointment[] | undefined> {
      const appointmentRepository =  new AppointmentRepository();
      const appointmentService = new AppointmentService(appointmentRepository);
      const appointments = await appointmentService.findAllByUserId(id);

      if(!appointments) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhuma consulta relacionada ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhuma consulta relacionada ao veterinário especificado.", 404);
      }

      let appointmentsCopy = Promise.all(appointments.map(async appointment => {
        let appointmentCopy:any = {...appointment};

        let pet = await petService.findById(Number(appointment.petId));

        let owner = await this.findById(Number(pet?.ownerId));
        let ownerCopy:any = {...owner};
        delete ownerCopy.password;
        delete ownerCopy.cpf;

        let vet = await this.findById(Number(appointment.vetId));
        let vetCopy: any = {...vet};
        delete vetCopy.password;
        delete vetCopy.cpf;

        appointmentCopy.pet = {...pet};
        appointmentCopy.owner = ownerCopy;
        appointmentCopy.vet = vetCopy;

        return appointmentCopy;
      }));

      return appointmentsCopy;
    }

    async getMyExamRequests(id: number, roleId: number): Promise<ExamRequest[] | undefined> {
      const examRequestRepository = new ExamRequestRepository();
      const examRequestService = new ExamRequestService(examRequestRepository);
      const examRequests = await examRequestService.findAllByUserId(id);

      if(!examRequests) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhum pedido de exame  relacionado ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhum pedido de exame  relacionado ao veterinário especificado.", 404);
      }

      let examRequestsCopy = Promise.all(examRequests.map(async examRequest => {
        let examRequestCopy:any = {...examRequest};

        let pet = await petService.findById(Number(examRequest.petId));

        let owner = await this.findById(Number(pet?.ownerId));
        let ownerCopy:any = {...owner};
        delete ownerCopy.password;
        delete ownerCopy.cpf;

        let vet = await this.findById(Number(examRequest.vetId));
        let vetCopy: any = {...vet};
        delete vetCopy.password;
        delete vetCopy.cpf;

        examRequestCopy.pet = {...pet};
        examRequestCopy.owner = ownerCopy;
        examRequestCopy.vet = vetCopy;

        return examRequestCopy;
      }));

      return examRequestsCopy;
    }

    async getMyVaccines(id: number, roleId: number): Promise<Vaccine[] | undefined> {
      const vaccineRepository = new VaccineRepository();
      const vaccineService = new VaccineService(vaccineRepository);
      const vaccines = await vaccineService.findAllByUserId(id);

      if(!vaccines) {
        if(roleId === Number(Roles.owner)) {
          throw new HttpError("Não foi possível encontrar nenhuma vacina relacionada ao tutor especificado.", 404);
        }
        throw new HttpError("Não foi possível encontrar nenhuma vacina relacionada ao veterinário especificado.", 404);
      }
      
      let vaccinesCopy = Promise.all(vaccines.map(async vaccine => {
        let vaccineCopy: any = {...vaccine};

        let pet = await petService.findById(Number(vaccine.petId));

        let owner = await this.findById(Number(pet?.ownerId));
        let ownerCopy:any = {...owner};
        delete ownerCopy.password;
        delete ownerCopy.cpf;

        let vet = await this.findById(Number(vaccine.vetId));
        let vetCopy: any = {...vet};
        delete vetCopy.password;
        delete vetCopy.cpf;

        vaccineCopy.pet = {...pet};
        vaccineCopy.owner = ownerCopy;
        vaccineCopy.vet = vetCopy;

        return vaccineCopy;
      }));
      return vaccinesCopy;
    }

    //owner exclusive
    async getMyPets(id: number): Promise<Pet[] | undefined> {
      const pets = await petService.findAllByUserId(id);
      return pets;
    }

    async getOwnerByPetId(petId: number): Promise<User | undefined> {
      const pet = await petService.findById(petId);

      if(!pet || pet && !pet.ownerId) {
        throw new HttpError("Não foi possível recuperar o pet especificado.", 404);
      }

      const ownerId = Number(pet.ownerId);
      const owner = await this.findById(ownerId);

      if(!owner) {
        throw new HttpError("Não foi possível recuperar o tutor especificado.", 404);
      }

      return owner;
    }

    async searchForVet(city?: string, district?: string): Promise<User[] | undefined> {
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

      let vetsCopy = Promise.all(vets.map(async vet => {
        let vetCopy: any = {...vet};
        let address = await addressService.findByUserId(vetCopy.id);

        if(address) {
          vetCopy.address = address;
        }

        delete vetCopy.password;
        delete vetCopy.cpf;
        return vetCopy;
      }));

      return vetsCopy;
    }

    async getAvailableAppointmentDatesForOwner(vetId: number, roleId: number): Promise<Date[] | undefined> {
      const appointments = await appointmentService.findAllAvailableForOwnerByUserId(vetId);
      const appointmentsDates = appointments?.map(appointment => appointment.appointmentDate);
      const appointmentDatesFiltered = appointmentsDates?.filter((value, index) => appointmentsDates.indexOf(value) === index);

      return appointmentDatesFiltered;
    }

    async getAvailableAppointmentTimesForOwner(vetId: number, appointmentDate: Date): Promise<any | undefined> {
      const appointments = await appointmentService.findAllAvailableForOwnerByUserIdAndDate(vetId, appointmentDate);
      const appointmentsTimes = appointments?.map(appointment => ({id: appointment.id, appointmentTime: appointment.appointmentTime}));

      return appointmentsTimes;
    }

    async scheduleAppointmentForOwner(appointmentId: number): Promise<Appointment | undefined> {
      const updatedAppointment = await appointmentService.updateAppointment(appointmentId, {scheduled: true});
      return updatedAppointment;
    }

    async cancelAppointmentAsOwner(appointmentId: number): Promise <Appointment | undefined> {
      const updatedAppointment = await appointmentService.updateAppointment(appointmentId, {scheduled: false});
      return updatedAppointment; 
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

      let patientsAndOwnersData = await Promise.all(patients.map(async patient => {
        let owner = await this.getOwnerByPetId(patient.id);
        let ownerCopy: any = {...owner};
        delete ownerCopy.password;
        delete ownerCopy.cpf;

        return {...patient, owner: ownerCopy};
      }));

      return patientsAndOwnersData;
    }

    async createVaccine(petId: number, vetId: number, vaccine: Partial<Vaccine>): Promise<Vaccine | undefined> {
      vaccine.petId = petId;
      vaccine.vetId = vetId;

      const createdVaccine = await vaccineService.createVaccine(vaccine);
      return createdVaccine;
    }

    async updateVaccine(vaccineId: number, petId: number, vetId: number, vaccineData: Partial<Vaccine>): Promise<Vaccine | undefined> {
      vaccineData.petId = petId;
      vaccineData.vetId = vetId;

      const updatedVaccine = await vaccineService.updateVaccine(vaccineId, vaccineData);
      return updatedVaccine;
    }

    async createExamRequest(petId: number, vetId: number, examRequest: Partial<ExamRequest>): Promise<ExamRequest | undefined> {
      examRequest.petId = petId;
      examRequest.vetId = vetId;

      const createdExamRequest = await examRequestService.createExamRequest(examRequest);
      return createdExamRequest;
    }

    async updateExamRequest(examRequestId: number, petId: number, vetId: number, examRequestData: Partial<ExamRequest>): Promise<ExamRequest | undefined> {
      examRequestData.petId = petId;
      examRequestData.vetId = vetId;

      const updatedExamRequest = await examRequestService.updateExamRequest(examRequestId, examRequestData);
      return updatedExamRequest;
    }

    async scheduleAppointmentAsVet(vetId: number, appointmentDate: Date, appointmentTime: string): Promise<Appointment | undefined> {
      const appointments = await appointmentService.findAllByUserId(vetId);
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
      return createdAppointment;
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
}
