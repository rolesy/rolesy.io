import scopeModel from '../../../../models/scope';

const findScopeByNameAndModule = ({ name, module }) => scopeModel.findOne({
  name,
  module,
}).lean().exec();

const findScopeById = (id) => scopeModel.findOne({ _id: id });

const newScope = (scope) => scopeModel.create({ ...scope });

export default {
  findScopeByNameAndModule,
  findScopeById,
  newScope,
};
