export default interface BinaryErrorModel {
  minlength?: {
    requiredLength: number;
    actualLength: number;
  };
  
  maxlength?: {
    requiredLength: number;
    actualLength: number;
  };

  required?: boolean;
}