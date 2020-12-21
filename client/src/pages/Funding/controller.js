import api from '../../services/paymentApi';

export const createPaymentLink = async (options) => {
	//const requestData = { email };
	try {
		const response = await api.getPaymentURL({ ...options });
		return response;
	} catch (err) {
		throw new Error(err);
	}
}