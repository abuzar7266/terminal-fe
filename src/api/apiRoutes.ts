const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const routeTemplates = {
    fetchChartData: `${API_BASE_URL}/cli/chart-data?filename=<filename>&columns=<columns>`,
    deleteChartData: `${API_BASE_URL}/cli/remove?filename=<filename>`
}


function processRoutes(routeTemplate: string,params: any) {
    const route = routeTemplate.replace(/<(\w+)>/g, (match, paramName) => {
      if (params.hasOwnProperty(paramName)) {
        return params[paramName];
      } else {
        throw new Error(`Parameter "${paramName}" not provided.`);
      }
    });
  
    return route;
}


export type ROUTES = keyof typeof routeTemplates;
/**
  * @param {string} routeName
  * @param {Object} [params={}]
  * @param {string}
*/

export function getRoutes(routeName: ROUTES, params = {}){
    let url: string = routeTemplates[routeName];
    return processRoutes(url, params);
}