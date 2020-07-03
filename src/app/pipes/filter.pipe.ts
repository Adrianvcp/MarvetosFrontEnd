import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  

  transform(value: any, ...args: any[]): any {
   // if( args.length < 3){}
   const resultPosts = [];
   for(const post of value){
     if(post.name.toLowerCase().indexOf(args) > -1){
        resultPosts.push(post);
     };
   };
   return resultPosts;
  }
  
}
