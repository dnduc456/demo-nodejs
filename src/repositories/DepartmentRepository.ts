import BaseRepository from "./base/BaseRepository";
import DeparmentModel from "@models/DeparmentModel";
import { IDepartment } from "@models/interfaces/DepartmentEntityInterface";

export default class DepartmentRepository extends BaseRepository<IDepartment> {
  constructor() {
    super(DeparmentModel as any);
  }
}
