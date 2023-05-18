import { useListenerIdProdA, useListenerOrderA } from "../store";

export function useAdminOrdersInfo() {
  // мобикс
    const orderA = useListenerOrderA();

    const idProdA = useListenerIdProdA();

  /* редакс
    const orderA = useSelector(state => state.orderA);

    const idProdA = useSelector(state => state.idProdA);
     */

    return {
        orderA,
        idProdA,
    };
}
