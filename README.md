node version ^14

## Getting Started

npm install or yarn install

First, run the development server:

npm run dev
# or
yarn run dev

Project-ը ստեղծվել է Next js-ով, որը տրամադրում է ռեստորանների ցուցակ և քարտեզ, քարտեզի  Api-ի համար օգտագործվել է google-maps-services-js գրադարանը, որը աշխատում է Next js-ի server-ում, server-ը աշխատում է node js-ով։ Next js-ի server-ում օգտագործվում է Express js: http://localhost:3000/api/ բոլոր հարցումները front end-ի համար կծառայեն որպես  Back-End: Front-end-ը կառուցված է React js ով և կիրառվել է typescript: Google Map -ի համար օգտագօրծվել է react-google-maps գրադարանը։ Next js-ի server-ի փոփոխության հետևման, development տարբերակի համար կիրառվել է nodemon որը հետևում է մեր ծրագրի փոփոխությանը և կրկին աշխատացնում ծրագիրը։


Ռեստորանների տվյալները,ցանկը և այլ տեղեկություներ ստանալու համար օգտագործվել է Google Map Place APi-n: Սկզբում ռեստորանների ցանկը ստանալու համար օգտագօրծվել է Place Api-ի textsearch-ը, որպես պարամետրեր փոխանցվում են ստատիկ տարբերակով Երևանի կորդինատները կամ region: 'yerevan', typ: 'restaurant, food', query: 'restaurant', query-ի արժեքը այն տեքստն է ինչը ցանկանում ենք փնտրել։ Պարամետրերի Key -ը դա ստատիկ արժեք է որը գեներացվում է console.cloud.google.com-ում։

Ռեստորանի էջում ցույց է տրվում մանրամասն տեղեկություններ տվյալ ռեստորանից, այդ տվյալները ստանալու համար front-end-ից հարցում է կատարվում http://localhost:3000/api/restaurant-details -ին և server-ում Place Api-ի placedetails֊ը կատարում է request ըստ place_id-ի ստանում տվյալները Google Map Place Api-ից, և ստացված տվյալը փոխանցվում front-end, որպես front-end-ից կատարած հարցման պատասխան
