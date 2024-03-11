export default async function checkPaymentStatus(
  orderId: string,
  userId?: string
) {
  const { data: status, error } = await useFetch('/api/payment/checkPayment', {
    body: JSON.stringify({
      OrderID: orderId,
    }),
    method: 'POST',
  })

  return status.value
}
