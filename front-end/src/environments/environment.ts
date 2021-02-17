// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://82.120.104.161:8080/api/v1',
  fileBaseUrl: 'http://82.120.104.161:8082'
};

export const zones = {
  0 : 'Centrale',
  1 : 'Hypochondre droit',
  2 : 'Epigastre',
  3 : 'Hypochondre gauche',
  4 : 'Flanc gauche',
  5 : 'Fosse iliaque gauche',
  6 : 'Pelvis',
  7 : 'Fosse iliaque droite',
  8 : 'Flanc droit',
  9 : 'Jéjunum proximal',
  10 : 'Jéjunum distal',
  11 : 'Iléon proximal',
  12 : 'Iléon distal'
}


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
