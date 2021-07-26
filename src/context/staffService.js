import { makeAutoObservable } from "mobx";

export class StaffService {
  allStaff;

  constructor() {
    makeAutoObservable(this);
    this.allStaff = [];
  }

  getSingleStaff(staffId) {
    const staffIndex = this.allStaff.findIndex(staff => staff.id === staffId);
    
    console.log(this.allStaff[staffIndex])
    return this.allStaff[staffIndex]
    
  }

  setStaff(staff) {
    this.allStaff = [...staff];
  }

  addStaff(newStaffDetails) {
    if (!newStaffDetails) throw Error('Please enter valid staff details');
    this.allStaff = [...this.allStaff, newStaffDetails];
  }

  deleteStaff(staffId) {
    const staffIndex = this.allStaff.findIndex(staff => staff.id === staffId);
    if (staffIndex === -1) return

    const copy = [...this.allStaff];
    copy.splice(staffIndex, 1);
    this.allStaff = [...copy];
  }

}

const staffService = new StaffService();

export default staffService;