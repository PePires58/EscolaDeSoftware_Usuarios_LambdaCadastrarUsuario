const assert = require('assert').strict;
const validateUserObjectService = require('../services/validate-user-object.service');

describe('Validate user Object Service tests', function () {
    it('Should have an error ""', function () {

        const errors = validateUserObjectService.validateUserObject({});

        assert.ok(errors.length > 0);
        assert.ok(errors.find(c => c === "Objeto de usuário é obrigatório"));
    });
});