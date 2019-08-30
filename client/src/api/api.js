// API layer for communication with an adjusted MyMonero-API-compatible server


import {keysToCamel} from "../utility";

const API_URL = "http://127.0.0.1:1984/";

const INIT_REQUEST = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
};

export const login = (address, view_key, generated_locally, create_account = true) => {
    const params = {address, view_key, generated_locally, create_account};
    return fetch( `${API_URL}/login`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => result.json());
};

/**
 * ping the backend to keep the tx search thread on backend alive for this account
 * @param address
 * @param view_key
 */
export const keepAlive = (address, view_key) => {

    const params = {address, view_key};
   return fetch( `${API_URL}/ping`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
       .then(result => keysToCamel(result.json()));

};


/**
 * get the list of all possible spendings, used when calculate the wallet balance
 * @param address
 * @param view_key
 */
export const getAddressInfo = (address, view_key) => {
    const params = {address, view_key};
    return fetch( `${API_URL}/get_address_info`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => keysToCamel(result.json()));
};


/**
 * return all txs for account ( for the scanned block height )
 * @param address
 * @param view_key
 */
export const getAddressTxs = (address, view_key) => {
    const params = {address, view_key};
    return fetch( `${API_URL}/get_address_txs`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => keysToCamel(result.json()));
};



//
// API endpoints for sending funds
//

export const getUnspentOuts = (address, view_key ) => {

    const amount = 0;
    const mixin = 0;
    const use_dust = false;
    const dust_threshold = "1000000000";


    const params = {address, view_key, amount, mixin, use_dust, dust_threshold};
    return fetch( `${API_URL}/get_unspent_outs`, { ...INIT_REQUEST, body: JSON.stringify(params) } )
        .then(result => keysToCamel(result.json()));

};


export const get_random_outs = () => {

};


export const submit_raw_tx = (tx) => {

};