export default class DB_Detail {

  public cfdh: string;
  public type: string;
  public date: string;
  public overview: string;

  constructor(obj: { [key: string]: string }) {
    this.cfdh = obj.cfdh;
    this.type = obj.type;
    this.date = obj.date;
    this.overview = obj.nrgy;
  }

  /*  private trimNRGY(nrgy: string): string {
     let filedArr = nrgy.split(',', 4);
     filedArr.length = 4;
     filedArr.splice(1, 1);
     let FiledString = filedArr.join();
     return FiledString;
   } */

}