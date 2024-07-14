declare module "*.png";
declare module "*.svg";
declare module "*.jpg";
declare module 'jspdf' {
    interface jsPDF {
      autoTable: (options: any) => jsPDF;
    }
  }

  declare module 'jspdf-autotable' {
    interface jsPDF {
        autoTable: (options: any) => { finalY: number };
    }
}