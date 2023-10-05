export default function userProfile({params}:any) {
  return (
    <div>
      <h1>Profile Page  {params.id}</h1>
    </div>
  );
}
