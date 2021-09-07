import scopeModel from '../../../../models/scope';

const findScopeByNameAndModule = ({ name, module }) => scopeModel.findOne({
  name,
  module,
}).lean().exec();

const findScopeById = (id) => scopeModel.findOne({ _id: id });

const newScope = (scope) => scopeModel.create({ ...scope });

const findScopes = ({
  page,
  limit,
  query,
}) => scopeModel.find(query.filters)
  .skip(Number(page))
  .limit(Number(limit))
  .sort({ ...query.order })
  .lean()
  .exec();

export default {
  findScopeByNameAndModule,
  findScopeById,
  newScope,
  findScopes,
};
