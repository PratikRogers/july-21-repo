 export const userListObj = 
 [
    {
        id : 1,
        displayName: "Admin",
        isSelected: false,
    },
    {
        id : 2,
        displayName: "Ad ops",
        isSelected: false,
    },
     {
         id : 3,
         displayName: "Audience Builder",
         isSelected: true,
     },
     {
        id : 4,
        displayName: "Beta tester",
        isSelected: false,
    },
     {
        id : 5,
        displayName: "Campaign Request",
        isSelected: true,
    },
    {
        id : 6,
        displayName: "CRM Uploader",
        isSelected: false,
    },
    {
        id : 7,
        displayName: "Requester",
        isSelected: true,
    },
    {
        id : 8,
        displayName: "Request Manager",
        isSelected: false,
    },
    {
        id : 9,
        displayName: "Reporting - Digital Portal",
        isSelected: true,
    },
    {
        id : 10,
        displayName: "Reporting - TV Portal",
        isSelected: true,
    },
    {
        id : 11,
        displayName: "Reporting - Digital Pacing",
        isSelected: true,
    },
    {
        id : 12,
        displayName: "Reporting - Digital Recent Reports",
        isSelected: true,
    },
    {
        id : 13,
        displayName: "Reporting - Excel Export",
        isSelected: false,
    },
    {
        id : 14,
        displayName: "Reporting - PowerPoint Export",
        isSelected: false,
    },
    {
        id : 15,
        displayName: "Reporting - Domo link",
        isSelected: false,
    },
 ];
 


 export function switchFlag(arrObj:any,id:any) {
   return (arrObj.findIndex((obj:any) => obj.id == id ) >=0 ? true: false);
 }

 