import { useParams } from "react-router";
import useUrlStore from "@/store/url";
import ReturnLink from "@/components/atoms/ReturnLink";
import FormMedicalRecordFeature from "@/features/medicalRecords/components/FormMedicalRecordFeature";
import ListMedicalRecordsFeature from "@/features/medicalRecords/components/ListMedicalRecordsFeature";
import useMedicalRecordStore from "@/store/medical_record";
import ToggleFormButton from "@/components/atoms/ToggleFormButton";

const MedicalRecord = () => {
  const { getUrl } = useUrlStore();
  const { list, showForm, setShowForm } = useMedicalRecordStore();
  const { id } = useParams<{ id: string }>();

  return (
    <section className="flex flex-col gap-6 p-4">
      <nav>
        <ReturnLink to={`${getUrl()}`} title="regresar" />
      </nav>
      {(list.length > 0 || showForm) && (
        <ToggleFormButton
          isOpen={showForm}
          onToggle={() => setShowForm(!showForm)}
        />
      )}

      <section className="flex gap-3 flex-col md:flex-row w-full justify-center">
        <div
          className={` ${showForm || list.length < 1 ? "block" : "hidden"}
        ${list.length > 0 || showForm ? "md:block" : "hidden"} md:w-1/2 lg:w-2/5`}
        >
          <FormMedicalRecordFeature patientId={Number(id)} />
        </div>
        <div
          className={`${list.length < 1 ? "h-screen" : "h-auto"} md:w-1/2 lg:w-3/6`}
        >
          <ListMedicalRecordsFeature patientId={Number(id)} />
        </div>
      </section>
    </section>
  );
};

export default MedicalRecord;
