import axios from "axios";
import {environment} from "@/environment/environment.js";

export class PaymentDetailsService {

    constructor() {
        this.http = axios.create({
            baseURL: environment.baseUrl
        })
    }
    async savePaymentDetails(paymentDetails) {
        return await this.http.post("payment-detail", paymentDetails);
    }

}