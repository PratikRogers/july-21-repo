  

export function getIndex(list:any,itemIndex:any) {
    return list.findIndex((obj: any) => obj.segmentId === itemIndex);
}
  

export function isDropZoneEmpty(card: any) {
    return card.isSelected;
}
 