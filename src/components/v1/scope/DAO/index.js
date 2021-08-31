import scopeModel from '../../../../models/scope';

const findScopeByNameAndModule = ({ name, module }) => scopeModel.findOne({
  name,
  module,
}).lean().exec();

const newScope = (scope) => scopeModel.create({ ...scope });

export default {
  findScopeByNameAndModule,
  newScope,
};
