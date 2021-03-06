'use strict';

const Code = require('code');
const Constants = require('../../../../../../../client/pages/admin/accounts/search/constants');
const Lab = require('lab');
const Store = require('../../../../../../../client/pages/admin/accounts/search/store');


const lab = exports.lab = Lab.script();


lab.experiment('Admin Accounts Create New Reducer', () => {

    lab.test('it handles a CREATE_NEW action', (done) => {

        Store.dispatch({
            type: Constants.CREATE_NEW
        });

        const state = Store.getState().createNew;

        Code.expect(state.loading).to.be.true();

        done();
    });


    lab.test('it handles a CREATE_NEW_RESPONSE action', (done) => {

        Store.dispatch({
            type: Constants.CREATE_NEW_RESPONSE,
            err: null,
            response: {}
        });

        const state = Store.getState().createNew;

        Code.expect(state.loading).to.be.false();

        done();
    });


    lab.test('it handles a SHOW_CREATE_NEW action', (done) => {

        Store.dispatch({
            type: Constants.SHOW_CREATE_NEW
        });

        const state = Store.getState().createNew;

        Code.expect(state.show).to.be.true();

        done();
    });


    lab.test('it handles a HIDE_CREATE_NEW action', (done) => {

        Store.dispatch({
            type: Constants.HIDE_CREATE_NEW
        });

        const state = Store.getState().createNew;

        Code.expect(state.show).to.be.false();

        done();
    });
});
