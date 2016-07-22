var jsonforms_pathresolver_1 = require('./pathresolver/jsonforms-pathresolver');
var tv4 = require('tv4');
var HashTable = (function () {
    function HashTable() {
        this.hashes = {};
    }
    HashTable.prototype.put = function (key, value) {
        this.hashes[JSON.stringify(key)] = value;
    };
    HashTable.prototype.get = function (key) {
        return this.hashes[JSON.stringify(key)];
    };
    return HashTable;
})();
var Services = (function () {
    function Services() {
        this.services = {};
    }
    Services.prototype.add = function (service) {
        this.services[service.getId()] = service;
    };
    Services.prototype.get = function (serviceId) {
        return this.services[serviceId];
    };
    return Services;
})();
exports.Services = Services;
var ScopeProvider = (function () {
    function ScopeProvider(scope) {
        this.scope = scope;
    }
    ScopeProvider.prototype.getId = function () {
        return ServiceId.ScopeProvider;
    };
    ScopeProvider.prototype.getScope = function () {
        return this.scope;
    };
    return ScopeProvider;
})();
exports.ScopeProvider = ScopeProvider;
var PathResolverService = (function () {
    function PathResolverService() {
        this.resolver = new jsonforms_pathresolver_1.PathResolver();
    }
    PathResolverService.prototype.getId = function () {
        return ServiceId.PathResolver;
    };
    PathResolverService.prototype.getResolver = function () {
        return this.resolver;
    };
    return PathResolverService;
})();
exports.PathResolverService = PathResolverService;
var SchemaProvider = (function () {
    function SchemaProvider(schema) {
        this.schema = schema;
    }
    SchemaProvider.prototype.getId = function () {
        return ServiceId.SchemaProvider;
    };
    SchemaProvider.prototype.getSchema = function () {
        return this.schema;
    };
    return SchemaProvider;
})();
exports.SchemaProvider = SchemaProvider;
var UiSchemaProvider = (function () {
    function UiSchemaProvider(schema) {
        this.schema = schema;
    }
    UiSchemaProvider.prototype.getId = function () {
        return ServiceId.UiSchemaProvider;
    };
    UiSchemaProvider.prototype.getUiSchema = function () {
        return this.schema;
    };
    return UiSchemaProvider;
})();
exports.UiSchemaProvider = UiSchemaProvider;
var ValidationService = (function () {
    function ValidationService() {
        this.validationResults = new HashTable();
        this.checkObjects = [];
    }
    ValidationService.prototype.getId = function () {
        return ServiceId.Validation;
    };
    ValidationService.prototype.getResult = function (instance, dataPath) {
        if (this.validationResults.get(instance) === undefined) {
            return undefined;
        }
        else {
            return this.validationResults.get(instance)[dataPath];
        }
    };
    ValidationService.prototype.validate = function (instance, schema) {
        var _this = this;
        if (tv4 === undefined) {
            return;
        }
        this.convertAllDates(instance);
        this.checkObjects = [];
        this.clear(instance);
        var results = tv4.validateMultiple(instance, schema);
        results['errors'].forEach(function (error) {
            if (error['schemaPath'].indexOf('required') !== -1) {
                var propName = error['dataPath'] + '/' + error['params']['key'];
                _this.validationResults.get(instance)[propName] = 'Required';
            }
            else {
                _this.validationResults.get(instance)[error['dataPath']] = error['message'];
            }
        });
    };
    ValidationService.prototype.convertAllDates = function (instance) {
        var _this = this;
        _.forOwn(instance, function (value, key) {
            if (_.includes(_this.checkObjects, value)) {
                return;
            }
            _this.checkObjects.push(value);
            if (value instanceof Date) {
                instance[key] = value.toString();
            }
            else if (value instanceof Object) {
                _this.convertAllDates(value);
            }
        });
    };
    ValidationService.prototype.clear = function (instance) { this.validationResults.put(instance, {}); };
    return ValidationService;
})();
exports.ValidationService = ValidationService;
(function (ServiceId) {
    ServiceId[ServiceId["Validation"] = 0] = "Validation";
    ServiceId[ServiceId["DataProvider"] = 1] = "DataProvider";
    ServiceId[ServiceId["SchemaProvider"] = 2] = "SchemaProvider";
    ServiceId[ServiceId["ScopeProvider"] = 3] = "ScopeProvider";
    ServiceId[ServiceId["RuleService"] = 4] = "RuleService";
    ServiceId[ServiceId["PathResolver"] = 5] = "PathResolver";
    ServiceId[ServiceId["UiSchemaProvider"] = 6] = "UiSchemaProvider";
})(exports.ServiceId || (exports.ServiceId = {}));
var ServiceId = exports.ServiceId;
//# sourceMappingURL=services.js.map