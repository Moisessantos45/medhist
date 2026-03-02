import { useParams } from "react-router";
import { useState } from "react";
import useUrlStore from "@/store/url";
import ReturnLink from "@/components/atoms/ReturnLink";
import FormMedicalRecordFeature from "@/features/medicalRecords/components/FormMedicalRecordFeature";
import ListMedicalRecordsFeature from "@/features/medicalRecords/components/ListMedicalRecordsFeature";

const MedicalRecord = () => {
  const { getUrl } = useUrlStore();
  const [hiddenForm, setHiddenForm] = useState(true);
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col gap-2 p-4 justify-center">
      <div className="flex flex-row mx-auto gap-2 mb-2 justify-start w-full">
        <ReturnLink to={`${getUrl()}`} title="regresar" />
        <button
          type="button"
          className="bg-indigo-600 uppercase font-bold py-2 px-4 rounded-md text-white md:hidden"
          onClick={() => setHiddenForm(!hiddenForm)}
        >
          {" "}
          {hiddenForm ? "Ocultar Form" : "Mostrar Form"}
        </button>
      </div>

      <section className="flex gap-3 flex-col md:flex-row w-full justify-center">
        <div
          className={`${
            hiddenForm ? "block" : "hidden"
          } md:block md:w-1/2 lg:w-2/5 my-2`}
        >
          <FormMedicalRecordFeature patientId={Number(id)} />
        </div>
        <div className="md:w-1/2 lg:w-3/6">
          <ListMedicalRecordsFeature patientId={Number(id)} />
        </div>
      </section>
    </section>
  );
};

export default MedicalRecord;
