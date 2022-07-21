export default function (elem:any,indx:any) {
        if(elem && elem instanceof(Object)) {
                elem.slickGoTo(indx);
        }
}