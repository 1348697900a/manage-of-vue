<!-- eslint-disable vue/multi-word-component-names -->
<script lang="tsx">
  import { compile, defineComponent, h, ref } from 'vue';
  import routes from '@/router/modules';
  import { useRouter, type RouteRecordRaw } from 'vue-router';
  import getParentsKeys from './utils';
  import useCheckAuth from '@/utils/check-auth';
  export default defineComponent({
    setup() {
      const [, checkAuth] = useCheckAuth();
      const router = useRouter();
      const selectedKeys = ref<string[]>([]);
      const openSelectedKeys = ref<string[]>([]);
      // 过滤无权限的路由
      const renderSubMenu = () => {
        const helper = (_route: RouteRecordRaw[], nodeList: any[] = []) => {
          if (_route.length > 0) {
            _route.forEach((config) => {
              const routeAuth = config.meta?.auth;
              if (!routeAuth || checkAuth(routeAuth)) {
                const icon = config.meta?.icon
                  ? h(compile(`<${config.meta.icon}/>`))
                  : null;
                const node =
                  config.children && config.children.length > 0 ? (
                    <a-sub-menu
                      key={config.path}
                      v-slots={{
                        title: () => config.name,
                        icon: () => icon,
                      }}
                    >
                      {helper(config.children)}
                    </a-sub-menu>
                  ) : (
                    <a-menu-item
                      key={config.path}
                      v-slots={{ icon: () => icon }}
                    >
                      {config.name}
                    </a-menu-item>
                  );
                nodeList.push(node);
              }
            });
          }
          return nodeList;
        };

        return helper(routes);
      };
      router.beforeEach((to, _, next) => {
        selectedKeys.value = [to.path];
        openSelectedKeys.value = [
          ...new Set([
            ...openSelectedKeys.value,
            ...getParentsKeys(routes, to.path),
          ]),
        ];
        next();
      });
      return () => (
        <a-menu
          auto-open={false}
          onMenuItemClick={(key: string) => router.push(key)}
          onSubMenuClick={(_: any, keyList: string[]) => {
            openSelectedKeys.value = keyList;
          }}
          open-keys={openSelectedKeys.value}
          selected-keys={selectedKeys.value}
          auto-open-selected={true}
          level-indent={34}
          style="height: 100%;width:100%;"
        >
          {renderSubMenu()}
        </a-menu>
      );
    },
  });
</script>
