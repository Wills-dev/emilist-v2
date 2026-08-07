import Button from "@/components/atoms/Button/Button";
import { UserExpertService } from "../../types/expertService";

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-[#474C48]">{label}</p>
    <p className="mt-2 rounded-lg bg-[#F7F7F7] px-4 py-3 text-[#737774]">
      {value || "—"}
    </p>
  </div>
);

const ServiceBusinessDetails = ({
  expert,
  onEdit,
  onManageCredentials,
}: {
  expert: UserExpertService;
  onEdit: () => void;
  onManageCredentials: () => void;
}) => (
  <div className="bg-white p-2">
    <div className="rounded-lg bg-white p-4">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-exo font-semibold">Business Details</h2>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="h-8 px-3! py-2 text-xs"
            onClick={onEdit}
          >
            Edit Service
          </Button>
          <Button
            variant="secondary"
            className="h-8 px-3! py-2 text-xs"
            onClick={onManageCredentials}
          >
            Manage Credentials
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
        <Detail label="Coverage areas" value={expert.coverageArea.join(", ")} />
        <Detail label="Services" value={expert.services.join(", ")} />
        <Detail label="Business name" value={expert.businessName} />
        <Detail label="Year founded" value={expert.yearFounded} />
        <Detail
          label="Number of employees"
          value={expert.numberOfEmployee}
        />
        <Detail label="Business address" value={expert.businessAddress} />
        <Detail label="State" value={expert.businessState} />
        <Detail label="Country" value={expert.businessCountry} />
        <Detail
          label="Starting price"
          value={`${expert.currency} ${Number(expert.startingPrice).toLocaleString()} ${expert.rateUnit}`}
        />
        <Detail label="Notice period" value={expert.noticePeriod} />
      </div>
    </div>
  </div>
);

export default ServiceBusinessDetails;
