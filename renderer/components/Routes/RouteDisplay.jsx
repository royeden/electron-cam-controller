export default function RouteInput({
  enabled,
  route = "",
  routes = [],
  to = {},
}) {

  return (
    <div className="my-8">
      <h3>{route.toUpperCase()}</h3>
      Enabled: <code>{`${enabled}`}</code>
      <div className="flex flex-wrap items-center w-full">
        <code className="block">/{routes.join('/')}</code>
      </div>
      <div className="w-full">
        <h4>Mapper:</h4>
          <code className="block">Min: {to.min}</code>
          <code className="block">Max: {to.max}</code>
      </div>
    </div>
  );
}
