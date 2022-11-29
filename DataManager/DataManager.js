import AsyncStorage from '@react-native-async-storage/async-storage';

export default class CommonDataManager {

    _userID = "";
    _user = null;
    _userOrders = [];

    /**
     * @returns {CommonDataManager}
     */
    static getInstance() {
        if (CommonDataManager.myInstance == null) {
            CommonDataManager.myInstance = new CommonDataManager();
        }
        return this.myInstance;
    }

    getUserID() {
        return CommonDataManager.getInstance._user.userid;
    }

    getUser() {
        return CommonDataManager.getInstance._user;
    }

    setUser(user) {
        CommonDataManager.getInstance._user = user;
    }

    async getOrdersFromStorage() {
        try {
            const key = 'orders' + this.getUserID();
            const existingOrders = await AsyncStorage.getItem(key);
            let orders = JSON.parse(existingOrders);
            return orders;
        } catch (e) {
            console.warn(e);
            return null;
        }
    }

    async setUserOrdersToStorage(order) {
        try {
            const key = 'orders' + this.getUserID();
            const existingProducts = await AsyncStorage.getItem(key);
            console.warn(existingProducts);
            let newProduct = JSON.parse(existingProducts);
            if (!newProduct) {
                newProduct = []
            }
            newProduct.push(order)
            await AsyncStorage.setItem(key, JSON.stringify(newProduct))
            return true;
        } catch (e) {
            console.warn('exception: ' + e);
            return false;
        }
    }

}