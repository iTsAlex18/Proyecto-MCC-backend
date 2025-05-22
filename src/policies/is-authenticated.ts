export default (policyContext) => {
  // policyContext.state.user contiene el usuario si está autenticado
  return !!policyContext.state.user;
};