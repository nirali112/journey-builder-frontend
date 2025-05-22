export interface Field {
    id: string;
    name: string;
    type: string;
  }
  
  export interface FormNode {
    id: string;
    name: string;
    fields: Field[];
    depends_on: string[];
  }
  