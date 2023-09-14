import { Injectable } from '@angular/core';

import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import { features } from 'process';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  async generateExcel() {
    // Excel Title, Header, Data
    const title = 'Car specification Format';
    const header = ['key', 'value'];
    const data = [
      ['Engine'],
      ['Engine Type'],
      ['Fuel Type'],
      ['Max Power (bhp@rpm)'],
      ['Max Torque (Nm@rpm)'],
      ['Mileage (ARAI) (kmpl)'],
      ['Driving Range (Km)'],
      ['Drivetrain'],
      ['Transmission'],
      ['Emission Standard'],
      ['Others'],
    ];

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');

    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Corbel',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };
    worksheet.addRow([]);
    // Blank Row
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Engine & Transmission']);
    subTitleRow.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };
    worksheet.mergeCells('A1:D2');

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);
    // SECOND SECION
    const subTitleRow2 = worksheet.addRow(['Dimensions & Weight']);
    subTitleRow2.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header2 = ['key', 'value'];
    const data2 = [
      ['Length (mm)'],
      ['Width (mm)'],
      ['Height (mm)'],
      ['Wheelbase (mm)'],
      ['Ground Clearance (mm)'],
    ];

    // Add Header Row
    const headerRow2 = worksheet.addRow(header2);

    // Cell Style : Fill and Border
    headerRow2.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data2.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #3
    const subTitleRow3 = worksheet.addRow(['Capacity']);

    subTitleRow3.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };
    const header3 = ['key', 'value'];
    const data3 = [
      ['Doors (Doors)'],
      ['Seating Capacity (Person)'],
      ['No of Seating Rows (Rows)'],
      ['Bootspace (litres)'],
      ['Fuel Tank Capacity (litres)'],
    ];

    // Add Header Row
    const headerRow3 = worksheet.addRow(header3);

    // Cell Style : Fill and Border
    headerRow3.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data3.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #4
    const subTitleRow4 = worksheet.addRow([
      'Suspensions, Brakes, Steering & Tyres',
    ]);
    subTitleRow4.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header4 = ['key', 'value'];
    const data4 = [
      ['Front Suspension'],
      ['Rear Suspension'],
      ['Front Brake Type'],
      ['Rear Brake Type'],
      ['Minimum Turning Radius (metres)'],
      ['Steering Type'],
      ['Wheels'],
      ['Spare Wheel'],
      ['Front Tyres'],
      ['Rear Tyres'],
    ];

    // Add Header Row
    const headerRow4 = worksheet.addRow(header4);

    // Cell Style : Fill and Border
    headerRow4.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data4.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // FEATURES NO 1

     // Excel Title, Header, Data
     const title2 = 'Car Features Format';
     const header5 = ['key', 'value'];
     const data5 = [
       ['Overspeed Warning'],
       ['Airbags'],
       ['Middle rear three-point seatbelt'],
       ['Middle Rear Head Rest'],
       ['Child Seat Anchor Points'],
       ['Seat Belt Warning'],
     ];
 
  
 
     // Add Row and formatting
     const titleRow2 = worksheet.addRow([title2]);
     titleRow2.font = {
       name: 'Corbel',
       family: 4,
       size: 16,
       underline: 'double',
       bold: true,
     };
     worksheet.addRow([]);
     // Blank Row
     worksheet.addRow([]);
     const subTitleRow5 = worksheet.addRow(['Safety']);
     subTitleRow5.font = {
       name: 'Corbel',
       family: 4,
       size: 14,
       underline: 'single',
       bold: true,
     };
    //  worksheet.mergeCells('A1:D2');
 
     // Add Header Row
     const headerRow5 = worksheet.addRow(header5);
 
     // Cell Style : Fill and Border
     headerRow5.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FFFFFF00' },
         bgColor: { argb: 'FF0000FF' },
       };
       cell.border = {
         top: { style: 'thin' },
         left: { style: 'thin' },
         bottom: { style: 'thin' },
         right: { style: 'thin' },
       };
     });
 
     // Add Data and Conditional Formatting
     data5.forEach((d) => {
       const row = worksheet.addRow(d);
       const qty = row.getCell(1);
       let color = 'FF99FF99';
       
 
       qty.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color },
       };
     });
 
     worksheet.getColumn(1).width = 30;
     worksheet.getColumn(2).width = 30;
     worksheet.addRow([]);

    //  features NO2 
    const subTitleRow6 = worksheet.addRow(['Braking & Traction']);
    subTitleRow6.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header6 = ['key', 'value'];
    const data6 = [
      ['Anti-Lock Braking System (ABS)'],
      ['Electronic Brake-force Distribution (EBD)'],
      ['Brake Assist (BA)'],
      ['Electronic Stability Program (ESP)'],
      ['Hill Hold Control'],
      ['Traction Control System (TC/TCS)']
    ];

    // Add Header Row
    const headerRow6 = worksheet.addRow(header6);

    // Cell Style : Fill and Border
    headerRow6.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data6.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #3
     const subTitleRow7 = worksheet.addRow(['Locks & Security']);

     subTitleRow7.font = {
       name: 'Corbel',
       family: 4,
       size: 14,
       underline: 'single',
       bold: true,
     };
     const header7 = ['key', 'value'];
     const data7 = [
       ['Engine immobilizer'],
       ['Central Locking'],
       ['Speed Sensing Door Lock'],
       ['Child Safety Lock'],
 
     ];
 
     // Add Header Row
     const headerRow7 = worksheet.addRow(header7);
 
     // Cell Style : Fill and Border
     headerRow7.eachCell((cell, number) => {
       cell.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: 'FFFFFF00' },
         bgColor: { argb: 'FF0000FF' },
       };
       cell.border = {
         top: { style: 'thin' },
         left: { style: 'thin' },
         bottom: { style: 'thin' },
         right: { style: 'thin' },
       };
     });
 
     // Add Data and Conditional Formatting
     data7.forEach((d) => {
       const row = worksheet.addRow(d);
       const qty = row.getCell(1);
       let color = 'FF99FF99';
       
 
       qty.fill = {
         type: 'pattern',
         pattern: 'solid',
         fgColor: { argb: color },
       };
     });
 
     worksheet.getColumn(1).width = 30;
     worksheet.getColumn(2).width = 30;
     worksheet.addRow([]);

     // SECTOPN #4
    const subTitleRow8 = worksheet.addRow([
      'Comfort & Convenience'
  ]);
  subTitleRow8.font = {
    name: 'Corbel',
    family: 4,
    size: 14,
    underline: 'single',
    bold: true,
  };

  const header8 = ['key', 'value'];
  const data8 = [
    ['Air Conditioner'],
    ['Front AC'],
    ['Heater'],
    ['Vanity Mirrors on Sun Visors'],
    ['Cabin-Boot Access'],
    ['Anti-glare Mirrors'],
    ['Parking Sensors'],
    ['Steering Adjustment'],
    ['12V Power Outlets'],
    ['Rear Tyres'],
  ];

  // Add Header Row
  const headerRow8 = worksheet.addRow(header8);

  // Cell Style : Fill and Border
  headerRow8.eachCell((cell, number) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFF00' },
      bgColor: { argb: 'FF0000FF' },
    };
    cell.border = {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' },
    };
  });

  // Add Data and Conditional Formatting
  data8.forEach((d) => {
    const row = worksheet.addRow(d);
    const qty = row.getCell(1);
    let color = 'FF99FF99';
    

    qty.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: color },
    };
  });

  worksheet.getColumn(1).width = 30;
  worksheet.getColumn(2).width = 30;
  worksheet.addRow([]);

   // SECTOPN #5
   const subTitleRow9 = worksheet.addRow(['Telematics']);
   subTitleRow9.font = {
     name: 'Corbel',
     family: 4,
     size: 14,
     underline: 'single',
     bold: true,
   };

   const header9 = ['key', 'value'];
   const data9 = [
     ['Over The Air (OTA) Updates'],
     
   ];

   // Add Header Row
   const headerRow9 = worksheet.addRow(header9);

   // Cell Style : Fill and Border
   headerRow9.eachCell((cell, number) => {
     cell.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'FFFFFF00' },
       bgColor: { argb: 'FF0000FF' },
     };
     cell.border = {
       top: { style: 'thin' },
       left: { style: 'thin' },
       bottom: { style: 'thin' },
       right: { style: 'thin' },
     };
   });

   // Add Data and Conditional Formatting
   data9.forEach((d) => {
     const row = worksheet.addRow(d);
     const qty = row.getCell(1);
     let color = 'FF99FF99';
     

     qty.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: color },
     };
   });

   worksheet.getColumn(1).width = 30;
   worksheet.getColumn(2).width = 30;
   worksheet.addRow([]);

   // SECTOPN #6
   const subTitleRow10 = worksheet.addRow(['Seats & Upholstery']);
   subTitleRow10.font = {
     name: 'Corbel',
     family: 4,
     size: 14,
     underline: 'single',
     bold: true,
   };

   const header10 = ['key', 'value'];
   const data10 = [
     ['Driver Seat Adjustment'],
     ['Front Passenger Seat Adjustment'],
     ['Rear Row Seat Adjustment'],
     ['Seat Upholstery'],
     ['Rear Passenger Seats Type'],
     ['Interiors'],
     ['Folding Rear Seat'],
     ['Split Rear Seat'],
     ['Head-rests'],
     

     
   ];

   // Add Header Row
   const headerRow10 = worksheet.addRow(header10);

   // Cell Style : Fill and Border
   headerRow10.eachCell((cell, number) => {
     cell.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: 'FFFFFF00' },
       bgColor: { argb: 'FF0000FF' },
     };
     cell.border = {
       top: { style: 'thin' },
       left: { style: 'thin' },
       bottom: { style: 'thin' },
       right: { style: 'thin' },
     };
   });

   // Add Data and Conditional Formatting
   data10.forEach((d) => {
     const row = worksheet.addRow(d);
     const qty = row.getCell(1);
     let color = 'FF99FF99';
     

     qty.fill = {
       type: 'pattern',
       pattern: 'solid',
       fgColor: { argb: color },
     };
   });

   worksheet.getColumn(1).width = 30;
   worksheet.getColumn(2).width = 30;
   worksheet.addRow([]);

    // SECTOPN #7
    const subTitleRow11 = worksheet.addRow(['Storage']);
    subTitleRow11.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header11 = ['key', 'value'];
    const data11 = [
      ['Cup Holders'],
      
    ];

    // Add Header Row
    const headerRow11 = worksheet.addRow(header11);

    // Cell Style : Fill and Border
    headerRow11.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data11.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #8
     const subTitleRow12 = worksheet.addRow(['Doors, Windows, Mirrors & Wipers']);
    subTitleRow12.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header12 = ['key', 'value'];
    const data12 = [
      ['Outside Rear View Mirrors Color (ORVMs)'],
      ['Power Windows'],
      ['One Touch -Down'],
      ['One Touch - Up'],
      ['Adjustable ORVM'],
      ['Turn Indicators on ORVM'],
      ['Rear Defogger'],
      ['Exterior Door Handles'],
      ['Interior Door Handles'],
      ['Door Pockets'],
      ['Boot-lid Opener'],

      
    ];

    // Add Header Row
    const headerRow12 = worksheet.addRow(header12);

    // Cell Style : Fill and Border
    headerRow12.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data12.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #9
     const subTitleRow13 = worksheet.addRow(['Exterior']);
    subTitleRow13.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header13 = ['key', 'value'];
    const data13 = [
      ['Roof Mounted Antenna'],
      ['Chrome Finish Exhaust pipe']
      
    ];

    // Add Header Row
    const headerRow13 = worksheet.addRow(header13);

    // Cell Style : Fill and Border
    headerRow13.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data13.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #10
    const subTitleRow14 = worksheet.addRow(['Lighting']);
    subTitleRow14.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header14 = ['key', 'value'];
    const data14 = [
      ['Headlights'],
      ['Tail Lights('],
      ['Cabin Lamps'],
      ['Rear Reading Lamp'],
      ['Headlight Height Adjuster'],
  

      
    ];

    // Add Header Row
    const headerRow14 = worksheet.addRow(header14);

    // Cell Style : Fill and Border
    headerRow14.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data14.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #11
     const subTitleRow15 = worksheet.addRow(['Instrumentation']);
    subTitleRow15.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header15 = ['key', 'value'];
    const data15 = [
      ['Instrument Cluster'],
      ['Trip Meter'],
      ['Average Fuel Consumption'],
      ['Distance to Empty'],
      ['Clock'],
      ['Door Ajar Warning'],
      ['Adjustable Cluster Brightness'],
      ['Shift Indicator'],
      ['Tachometer'],


      
    ];

    // Add Header Row
    const headerRow15 = worksheet.addRow(header15);

    // Cell Style : Fill and Border
    headerRow15.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data15.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);


    // SECTOPN #12
    const subTitleRow16 = worksheet.addRow(['Entertainment, Information & Communication']);
    subTitleRow16.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header16 = ['key', 'value'];
    const data16 = [
      ['Smart Connectivity'],
      ['Display'],
      ['Touch Screen Size (inch'],
      ['Integrated (in-dash) Music System'],
      ['Speakers'],
      ['Steering mounted controls'],
      ['Voice Command'],
      ['Bluetooth Compatibility'],
      ['Aux Compatibility'],
      ['AM/FM Radio'],
      ['USB Compatibility'],




      
    ];

    // Add Header Row
    const headerRow16 = worksheet.addRow(header16);

    // Cell Style : Fill and Border
    headerRow16.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data16.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #13
    const subTitleRow17 = worksheet.addRow(['Manufacturer Warranty']);
    subTitleRow17.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header17 = ['key', 'value'];
    const data17 = [
      ['Battery Warranty (Kilometres)'],
      
    ];

    // Add Header Row
    const headerRow17 = worksheet.addRow(header17);

    // Cell Style : Fill and Border
    headerRow17.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data17.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);


 



    // SPECIFICATIONS 
    
    // Footer Row
    // const footerRow = worksheet.addRow([
    //   'This is system generated excel sheet.',
    // ]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' },
    // };
    // footerRow.getCell(1).border = {
    //   top: { style: 'thin' },
    //   left: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   right: { style: 'thin' },
    // };

    // Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'CarSpecificationfORMAT.xlsx');
    });
  }












  async generateFeaturesExcel() {
    // Excel Title, Header, Data
    const title = 'Car Features Format';
    const header = ['key', 'value'];
    const data = [
      ['Overspeed Warning'],
      ['Airbags'],
      ['Middle rear three-point seatbelt'],
      ['Middle Rear Head Rest'],
      ['Child Seat Anchor Points'],
      ['Seat Belt Warning'],
    ];

    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sharing Data');

    // Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = {
      name: 'Corbel',
      family: 4,
      size: 16,
      underline: 'double',
      bold: true,
    };
    worksheet.addRow([]);
    // Blank Row
    worksheet.addRow([]);
    const subTitleRow = worksheet.addRow(['Safety']);
    subTitleRow.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };
    worksheet.mergeCells('A1:D2');

    // Add Header Row
    const headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);
    // SECOND SECION
    const subTitleRow2 = worksheet.addRow(['Braking & Traction']);
    subTitleRow2.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header2 = ['key', 'value'];
    const data2 = [
      ['Anti-Lock Braking System (ABS)'],
      ['Electronic Brake-force Distribution (EBD)'],
      ['Brake Assist (BA)'],
      ['Electronic Stability Program (ESP)'],
      ['Hill Hold Control'],
      ['Traction Control System (TC/TCS)']
    ];

    // Add Header Row
    const headerRow2 = worksheet.addRow(header2);

    // Cell Style : Fill and Border
    headerRow2.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data2.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #3
    const subTitleRow3 = worksheet.addRow(['Locks & Security']);

    subTitleRow3.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };
    const header3 = ['key', 'value'];
    const data3 = [
      ['Engine immobilizer'],
      ['Central Locking'],
      ['Speed Sensing Door Lock'],
      ['Child Safety Lock'],

    ];

    // Add Header Row
    const headerRow3 = worksheet.addRow(header3);

    // Cell Style : Fill and Border
    headerRow3.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data3.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #4
    const subTitleRow4 = worksheet.addRow([
        'Comfort & Convenience'
    ]);
    subTitleRow4.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header4 = ['key', 'value'];
    const data4 = [
      ['Air Conditioner'],
      ['Front AC'],
      ['Heater'],
      ['Vanity Mirrors on Sun Visors'],
      ['Cabin-Boot Access'],
      ['Anti-glare Mirrors'],
      ['Parking Sensors'],
      ['Steering Adjustment'],
      ['12V Power Outlets'],
      [''],
    ];

    // Add Header Row
    const headerRow4 = worksheet.addRow(header4);

    // Cell Style : Fill and Border
    headerRow4.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data4.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #5
     const subTitleRow5 = worksheet.addRow(['Telematics']);
    subTitleRow5.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header5 = ['key', 'value'];
    const data5 = [
      ['Over The Air (OTA) Updates'],
      
    ];

    // Add Header Row
    const headerRow5 = worksheet.addRow(header5);

    // Cell Style : Fill and Border
    headerRow5.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data5.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #6
     const subTitleRow6 = worksheet.addRow(['Seats & Upholstery']);
    subTitleRow6.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header6 = ['key', 'value'];
    const data6 = [
      ['Driver Seat Adjustment'],
      ['Front Passenger Seat Adjustment'],
      ['Rear Row Seat Adjustment'],
      ['Seat Upholstery'],
      ['Rear Passenger Seats Type'],
      ['Interiors'],
      ['Folding Rear Seat'],
      ['Split Rear Seat'],
      ['Head-rests'],
      

      
    ];

    // Add Header Row
    const headerRow6 = worksheet.addRow(header6);

    // Cell Style : Fill and Border
    headerRow6.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data6.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #7
     const subTitleRow7 = worksheet.addRow(['Storage']);
    subTitleRow5.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header7 = ['key', 'value'];
    const data7 = [
      ['Cup Holders'],
      
    ];

    // Add Header Row
    const headerRow7 = worksheet.addRow(header7);

    // Cell Style : Fill and Border
    headerRow7.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data7.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #8
     const subTitleRow8 = worksheet.addRow(['Doors, Windows, Mirrors & Wipers']);
    subTitleRow8.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header8 = ['key', 'value'];
    const data8 = [
      ['Outside Rear View Mirrors Color (ORVMs)'],
      ['Power Windows'],
      ['One Touch -Down'],
      ['One Touch - Up'],
      ['Adjustable ORVM'],
      ['Turn Indicators on ORVM'],
      ['Rear Defogger'],
      ['Exterior Door Handles'],
      ['Interior Door Handles'],
      ['Door Pockets'],
      ['Boot-lid Opener'],

      
    ];

    // Add Header Row
    const headerRow8 = worksheet.addRow(header8);

    // Cell Style : Fill and Border
    headerRow8.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data8.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #9
     const subTitleRow9 = worksheet.addRow(['Exterior']);
    subTitleRow9.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header9 = ['key', 'value'];
    const data9 = [
      ['Roof Mounted Antenna'],
      ['Chrome Finish Exhaust pipe']
      
    ];

    // Add Header Row
    const headerRow9 = worksheet.addRow(header9);

    // Cell Style : Fill and Border
    headerRow9.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data9.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

     // SECTOPN #10
     const subTitleRow10 = worksheet.addRow(['Lighting']);
    subTitleRow10.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header10 = ['key', 'value'];
    const data10 = [
      ['Headlights'],
      ['Tail Lights('],
      ['Cabin Lamps'],
      ['Rear Reading Lamp'],
      ['Headlight Height Adjuster'],
  

      
    ];

    // Add Header Row
    const headerRow10 = worksheet.addRow(header10);

    // Cell Style : Fill and Border
    headerRow10.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data10.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);
     // SECTOPN #11
     const subTitleRow11 = worksheet.addRow(['Instrumentation']);
    subTitleRow11.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header11 = ['key', 'value'];
    const data11 = [
      ['Instrument Cluster'],
      ['Trip Meter'],
      ['Average Fuel Consumption'],
      ['Distance to Empty'],
      ['Clock'],
      ['Door Ajar Warning'],
      ['Adjustable Cluster Brightness'],
      ['Shift Indicator'],
      ['Tachometer'],


      
    ];

    // Add Header Row
    const headerRow11 = worksheet.addRow(header11);

    // Cell Style : Fill and Border
    headerRow11.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data11.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);
    // SECTOPN #12
    const subTitleRow12 = worksheet.addRow(['Entertainment, Information & Communication']);
    subTitleRow12.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header12 = ['key', 'value'];
    const data12 = [
      ['Smart Connectivity'],
      ['Display'],
      ['Touch Screen Size (inch'],
      ['Integrated (in-dash) Music System'],
      ['Speakers'],
      ['Steering mounted controls'],
      ['Voice Command'],
      ['Bluetooth Compatibility'],
      ['Aux Compatibility'],
      ['AM/FM Radio'],
      ['USB Compatibility'],




      
    ];

    // Add Header Row
    const headerRow12 = worksheet.addRow(header12);

    // Cell Style : Fill and Border
    headerRow12.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data12.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    // SECTOPN #13
    const subTitleRow13 = worksheet.addRow(['Manufacturer Warranty']);
    subTitleRow13.font = {
      name: 'Corbel',
      family: 4,
      size: 14,
      underline: 'single',
      bold: true,
    };

    const header13 = ['key', 'value'];
    const data13 = [
      ['Battery Warranty (Kilometres)'],
      
    ];

    // Add Header Row
    const headerRow13 = worksheet.addRow(header13);

    // Cell Style : Fill and Border
    headerRow13.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
    });

    // Add Data and Conditional Formatting
    data13.forEach((d) => {
      const row = worksheet.addRow(d);
      const qty = row.getCell(1);
      let color = 'FF99FF99';
      

      qty.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color },
      };
    });

    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 30;
    worksheet.addRow([]);

    


    // SPECIFICATIONS 
    
    // Footer Row
    // const footerRow = worksheet.addRow([
    //   'This is system generated excel sheet.',
    // ]);
    // footerRow.getCell(1).fill = {
    //   type: 'pattern',
    //   pattern: 'solid',
    //   fgColor: { argb: 'FFCCFFE5' },
    // };
    // footerRow.getCell(1).border = {
    //   top: { style: 'thin' },
    //   left: { style: 'thin' },
    //   bottom: { style: 'thin' },
    //   right: { style: 'thin' },
    // };

    // Merge Cells
    // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

    // Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
      const blob = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });
      fs.saveAs(blob, 'CarFeaturesfORMAT.xlsx');
    });
  }
}