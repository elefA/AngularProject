export class Attribute {
  attrId : string | undefined;
  attrName:string = "";
  attrValue:string = "";

  //μεθοδος που καλειται για να μετατρεψει μια γραμμη απο json σε instance της κλασης Employee.
  adapt(item: any): Attribute {
    const attribute = new Attribute();
    attribute.attrId = item.attrId;
    attribute.attrName = item.attrName;
    attribute.attrValue = item.attrValue;
    return attribute;
  }
}
