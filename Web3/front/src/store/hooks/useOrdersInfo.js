import { useListenerOrderU, useListenerIdProdU } from "../store";

export function useOrdersInfo() {
  // мобикс
  const orderU = useListenerOrderU();

  const idProdU = useListenerIdProdU();

  /* редакс
    const orderU = useSelector(state => state.orderU);

    const idProdU = useSelector(state => state.idProdU);

     */

    return {
        orderU,
        idProdU
    }
}
