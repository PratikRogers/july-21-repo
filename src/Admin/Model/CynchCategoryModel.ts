import { v4 as uuidv4 } from "uuid";
export class CynchCategoryModel {
  categoryList: any;
  cynchSegmentList:any;
  attributeName:any;
  attributeDescription: any;
  cynchAttributeID: any;
  isCatEmpty:any;
  isDuplicateCat:any;
  build(cynchAttribs:any, list: any) {
    this.isCatEmpty = false;
    this.cynchAttributeID = cynchAttribs.cynchAttributeID
    this.attributeName = cynchAttribs.cynchAttributeName;
    this.attributeDescription = cynchAttribs.cynchAttributeDescription;
    this.categoryList = [];
    this.cynchSegmentList = [];
    this.cynchSegmentList = list.filter((item:any) => ((item.exposeToCynch == "Y") &&  (item.cynchSegmentType && item.cynchSegmentType == "Prizm"))).map((x:any) => ({...x,isSelected:false,ownedBy:''}));
    cynchAttribs.categories.map((el:any) => {
      let segIds:any[]=[];
      el.segments.forEach((item:any) => {
        segIds.push({segmentId:item.segmentId,segmentName:item.segmentName});
        if(this.cynchSegmentList) {
          let segIndx = this.cynchSegmentList.findIndex((segment:any) => segment.segmentId == item.segmentId);
          if(segIndx>=0) {
            this.cynchSegmentList[segIndx]['isSelected'] = true;
            this.cynchSegmentList[segIndx]['ownedBy'] = el.cynchCategoryID;
          }
        }
      });
      let categoryItem = {
        categoryName : el.cynchCategoryName,
        categoryId: el.cynchCategoryID,
        existingCategoryId:el.cynchCategoryID,
        segIds:segIds
      }
      this.categoryList.push(categoryItem);
     });

  }

  constructor(list: any) {
    this.isCatEmpty = false;
    let uniqueId = uuidv4();
    this.attributeName = '';
    this.cynchAttributeID = '';
    this.attributeDescription = '';
    this.categoryList = [
      { categoryName: "", categoryOrder: 0, segIds: [], categoryId: uniqueId },
    ];
    this.cynchSegmentList = list.filter((item:any) => ((item.exposeToCynch == "Y") &&  (item.cynchSegmentType && item.cynchSegmentType == "Prizm"))).map((x:any) => ({...x,isSelected:false,ownedBy:''}));
  }

  public addEmptyCategoryItem() {
    let uniqueId = uuidv4();
    this.categoryList.push({
      categoryName: "",
      categoryOrder: 0,
      segIds: [],
      categoryId: uniqueId,
    });
  }

  public getcategoryList() {
    return this.categoryList;
  }

  public getCynchSegments() {
      return this.cynchSegmentList;
  }
  
  public getEmptycategoryListItem() {
    return {
      id: 1,
      name: "",
      title: "",
    };
  }

  private getIndex(categoryId: any) {
    return this.categoryList.findIndex(
      (item: any) => item.categoryId == categoryId
    );
  }

  public getAttributeName() {
    return this.attributeName;
  }

  public setAttributeName(attributeName: any) {
    this.attributeName = attributeName;
  }

  public getAttributeDescription() {
    return this.attributeDescription;
  }

  public setAttributeDescription(attributedesc: any) {
    this.attributeDescription = attributedesc;
  }

  public updateCategoryName(categoryName: any, categoryId: any) {
    let indx = this.getIndex(categoryId);
    if (indx >= 0) {
      this.categoryList[indx].categoryName = categoryName;
    }
  }

  public updateCategorySegmentList(segList: any, categoryId: any) {
    this.cynchSegmentList = segList;
    let indx = this.getIndex(categoryId);
    if (indx >= 0) {
      this.categoryList[indx].segIds = segList
        .filter((item: any) => (item.isSelected == true && item.ownedBy == categoryId) )
        
    }
  }


  public deleteCategory(categoryId: any) {
    let indx = this.getIndex(categoryId);
    let arrIndexes:any[] = [];
    if (indx >= 0) {
        this.cynchSegmentList.map((el:any) => {
            var found = this.categoryList[indx].segIds.findIndex((s:any) => s.segmentId == el.segmentId);
            if (found >=0) {
               arrIndexes.push(found);
            }
           });
           arrIndexes.forEach((element:any) => {
            this.cynchSegmentList[element].isSelected = false;
            this.cynchSegmentList[element].ownedBy = '';
           });
    }
    this.categoryList.splice(indx,1);
  }

  public deleteSegment(segment: any, categoryId: any){
    let indx = this.getIndex(categoryId);
    if (indx >= 0) {
        let segIndex = this.categoryList[indx].segIds.findIndex(
            (item: any) => item.segmentId == segment.segmentId
          );
        if (segIndex >=0) {
            this.categoryList[indx].segIds.splice(segIndex,1);
            let cynchIndex = this.cynchSegmentList.findIndex(
                (item: any) => item.segmentId == segment.segmentId
              );
            if (cynchIndex >=0) {
                this.cynchSegmentList[cynchIndex].isSelected = false;
                this.cynchSegmentList[cynchIndex].ownedBy = '';
                 
            }
        }
    }
  }

  public getCategoryIndexName(categoryId: any) {
    let indx = this.getIndex(categoryId);
    if (indx >= 0) {
      return this.categoryList[indx].categoryName;
    }
  }



  public getRecordWithSeparator(record: any, separator: any) {
    const arrayOfStrings = record.split(separator);
    return arrayOfStrings;
  }
  public getcategoryListItem(listItem: any, indx: any) {
    const Item = this.getEmptycategoryListItem();
    Item.id = listItem.logId;
    Item.name = Item.title = listItem.logId + ": " + listItem.origFileName;
    return Item;
  }

  public getcategoryListName(id: any) {
    let index = this.categoryList.findIndex((obj: any) => obj.id === id);
    return index >= 0 ? this.categoryList[index].name : "";
  }

  public setcategoryListItems(reqObj: any, rId: any) {
    let item = this.getcategoryListItem(reqObj, rId);
    this.categoryList.push(item);
  }

  public getCynchAttributePayload() {
    let payload = {
      cynchAttributeName : this.attributeName,
      cynchAttributeDescription: this.attributeDescription,
      cynchAttributeID: this.cynchAttributeID
    }
    let categories:any[]=[];
    this.categoryList.map((el:any) => {
            let segmentations:any[]=[];
            el.segIds.forEach((item:any) => {
              segmentations.push({segmentId:item.segmentId,segmentName:item.segmentName});
            });
            let categoryItem = {
              cynchCategoryName : el.categoryName,
              segments:segmentations
            }
            if (el.existingCategoryId) {
              categoryItem['cynchCategoryID'] = el.existingCategoryId
            }
            categories.push(categoryItem);
           });
    payload["categories"] = categories;
    return payload;
  }

  public isObjectReady() {
    this.isCatEmpty = false;
    this.isDuplicateCat = false;
    if (this.attributeName == '') {
      return false;
    }
    if (this.getAttributeDescription() == '') {
      return false;
    }
    this.categoryList.map((el:any) => {
      if (el.categoryName == '' ) {
        this.isCatEmpty = true;
      }
     });
     let valueArr = this.categoryList.map(function(item:any){ return item.categoryName });
     this.isDuplicateCat = valueArr.some(function(item:any, idx:any){ 
          return valueArr.indexOf(item) != idx 
      });
     if (this.isCatEmpty) {
       return false;
     }
     if (this.isDuplicateCat) {
       return false;
     }
     return true;
  }

  public isCategoryEmpty() {
    return this.isCatEmpty;
  }

  public isCategoryDuplicate() {
    return this.isDuplicateCat;
  }
}

export default CynchCategoryModel;
