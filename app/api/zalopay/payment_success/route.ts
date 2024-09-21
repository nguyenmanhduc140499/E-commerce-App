// import axios from "axios";
// import qs from 'qs'
// import CryptoJS from "crypto-js";
// import { NextRequest, NextResponse } from "next/server";

// const corsHeaders = {
//     "Access-Control-Allow-Origin": "*",
//     "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "Access-Control-Allow-Headers": "Content-Type, Authorization",
// };

// export async function OPTIONS() {
//     return NextResponse.json({}, { headers: corsHeaders });
// }
// export const POST = async (req: NextRequest) => {
//     const data = await req.json()
//     console.log("data", data)
//     if (req.method === "POST") {
//         const key1 = process.env.ZALOPAY_KEY1;
//         const endpoint = process.env.ZALOPAY_SANDBOX_QUERY_STATUS_ENDPOINT
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         const postData: any = {
//             app_id: process.env.ZALOPAY_APP_ID,
//             app_trans_id: data.app_trans_id
//         }

//         const dataRes = postData.app_id + "|" + postData.app_trans_id + "|" + key1; // appid|app_trans_id|key1
//         postData.mac = CryptoJS.HmacSHA256(dataRes, key1!).toString();

//         const postConfig = {
//             method: 'post',
//             url: endpoint,
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             data: qs.stringify(postData)
//         };
//         try {
//             const result = await axios(postConfig)
//             console.log("res", result.data)
//             return NextResponse.json(result.data, {
//                 headers: corsHeaders,
//                 status: 200,
//             });

//         } catch (error) {
//             console.error("[payment_status_POST]", error);
//             return NextResponse.json(
//                 { message: "Payment creation failed" },
//                 { status: 500 }
//             );
//         }

//     } else {
//         return NextResponse.json(
//             { message: "Method Not Allowed" },
//             { status: 405 }
//         );
//     }
// };

//frontend

// const [appTransId, setAppTranId] = useState("");
// const redirect = async () => {
//     //call API to confirm payment status
//     const confirm = await fetch(
//       `${process.env.NEXT_PUBLIC_API_URL}/zalopay/payment_success`,
//       {
//         method: "POST",
//         body: JSON.stringify({ app_trans_id: appTransId }),
//       }
//     );
//     const status = await confirm.json();
//     console.log("status", status);
//     if (status.return_code === 1) {
//       window.location.href = `${process.env.ECOMMERCE_STORE_URL}/payment_success`;
//       // router.push("/payment_success");
//     } else {
//       window.location.href = `${process.env.ECOMMERCE_STORE_URL}/cart`;
//       // router.push("/cart");
//     }
//   };

//   useEffect(() => {
//     if (appTransId) {
//       console.log("aaa", appTransId);
//       setLoading(true);
//       redirect();
//     }
//   }, [appTransId]);