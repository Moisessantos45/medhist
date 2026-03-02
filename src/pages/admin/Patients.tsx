import ReturnLink from "@/components/atoms/ReturnLink";
import ListPatientsFeature from "@/features/patients/components/ListPatientsFeature";
import useUrlStore from "@/store/url";

const Patients = () => {
  const { getUrl } = useUrlStore();

  return (
    <section className="flex flex-col p-4 gap-3">
      <nav className="flex gap-3">
        <ReturnLink to={`${getUrl()}`} title="regresar" />
      </nav>

      <section className="mx-auto flex w-full md:max-w-7xl flex-col gap-5 px-5">
      <ListPatientsFeature />
      </section>
    </section>
  );
};

export default Patients;
