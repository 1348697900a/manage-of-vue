import "vue-router";
declare module "vue-router" {
   interface RouteMeta {
        auth?: string;
        icon?: string;
        hidden?:boolean
    }

}