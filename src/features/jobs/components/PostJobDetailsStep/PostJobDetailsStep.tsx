"use client";

import { useShallow } from "zustand/react/shallow";

import Input from "@/components/atoms/Input/Input";
import Select from "@/components/atoms/Select/Select";
import Textarea from "@/components/atoms/TextArea/Textarea";
import FormField from "@/components/molecules/FormField/FormField";
import OptionToggle from "@/components/molecules/OptionToggle/OptionToggle";
import JobImageInput from "../JobImageInput/JobImageInput";
import JobUrgencyFields from "../JobUrgencyFields/JobUrgencyFields";
import {
  POST_JOB_CATEGORY_OPTIONS,
  POST_JOB_CATEGORY_SERVICE_OPTIONS,
  POST_JOB_EXPERIENCE_OPTIONS,
  POST_JOB_URGENCY_OPTIONS,
  PostJobCategory,
} from "../../constants/postJob";
import { PostJobDetailsErrors } from "../../helpers/validatePostJob";
import {
  JobExperienceLevel,
  JobUrgency,
} from "../../types/postJob";
import { usePostJobStore } from "@/store/job/postJobStore";

const PostJobDetailsStep = ({
  errors,
  onAddImages,
  onRemoveImage,
}: {
  errors: PostJobDetailsErrors;
  onAddImages: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}) => {
  const {
    allowBidding,
    description,
    experienceLevel,
    expertId,
    jobCategory,
    jobUrgency,
    location,
    previews,
    service,
    setField,
    setLocationField,
    title,
  } = usePostJobStore(
    useShallow((state) => ({
      allowBidding: state.allowBidding,
      description: state.description,
      experienceLevel: state.experienceLevel,
      expertId: state.expertId,
      jobCategory: state.jobCategory,
      jobUrgency: state.jobUrgency,
      location: state.location,
      previews: state.previews,
      service: state.service,
      setField: state.setField,
      setLocationField: state.setLocationField,
      title: state.title,
    })),
  );

  const services = jobCategory
    ? [
        ...(POST_JOB_CATEGORY_SERVICE_OPTIONS[
          jobCategory as PostJobCategory
        ] ?? []),
      ].map((item) => ({ label: item, value: item }))
    : [];
  const isDirectHire = Boolean(expertId.trim());

  return (
    <div className="space-y-8">
      <div className="space-y-6 border-b border-[#E5E5E5] pb-6">
        <FormField
          htmlFor="job-category"
          label="Select job category"
          error={errors.jobCategory}
        >
          <Select
            id="job-category"
            name="jobCategory"
            value={jobCategory}
            options={POST_JOB_CATEGORY_OPTIONS}
            placeholder="Select a category"
            onChange={(event) => {
              setField("jobCategory", event.target.value);
              setField("service", "");
            }}
            aria-invalid={Boolean(errors.jobCategory)}
            aria-describedby={
              errors.jobCategory ? "job-category-description" : undefined
            }
          />
        </FormField>

        <FormField
          htmlFor="job-service"
          label="Narrow down to a service"
          error={errors.service}
        >
          <Select
            id="job-service"
            name="service"
            value={service}
            options={services}
            placeholder={
              jobCategory ? "Select a service" : "Select a category first"
            }
            disabled={!jobCategory}
            onChange={(event) => setField("service", event.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={
              errors.service ? "job-service-description" : undefined
            }
          />
        </FormField>

        <FormField
          htmlFor="job-title"
          label="Enter a title for your job"
          error={errors.title}
        >
          <Input
            id="job-title"
            name="title"
            value={title}
            maxLength={120}
            onChange={(event) => setField("title", event.target.value)}
            placeholder="e.g. Fix a leaking kitchen sink"
            aria-invalid={Boolean(errors.title)}
            aria-describedby={
              errors.title ? "job-title-description" : undefined
            }
          />
        </FormField>

        <FormField
          htmlFor="job-description"
          label="Describe your job"
          error={errors.description}
        >
          <Textarea
            id="job-description"
            name="description"
            value={description}
            maxLength={5000}
            onChange={(event) => setField("description", event.target.value)}
            placeholder="Be as detailed as possible"
            className="min-h-35"
            aria-invalid={Boolean(errors.description)}
            aria-describedby={
              errors.description ? "job-description-description" : undefined
            }
          />
        </FormField>

        <JobImageInput
          previews={previews}
          onAdd={onAddImages}
          onRemove={onRemoveImage}
        />
      </div>

      <section className="space-y-6" aria-labelledby="job-urgency-title">
        <div className="space-y-2">
          <h2 id="job-urgency-title" className="font-exo font-semibold">
            Job Urgency
          </h2>
          <p className="text-sm text-[#737774]">
            When do you need this service?
          </p>
          <OptionToggle
            name="jobUrgency"
            ariaLabel="Job urgency"
            options={POST_JOB_URGENCY_OPTIONS}
            value={jobUrgency}
            onChange={(value) =>
              setField("jobUrgency", value as JobUrgency)
            }
          />
        </div>

        <JobUrgencyFields errors={errors} />

        <FormField
          htmlFor="job-location"
          label="Select job location"
          error={errors.location}
          helperText="Enter the full address where the work will take place."
        >
          <Input
            id="job-location"
            name="location"
            value={location.address}
            onChange={(event) =>
              setLocationField("address", event.target.value)
            }
            placeholder="12 Admiralty Way, Lekki, Lagos"
            aria-invalid={Boolean(errors.location)}
            aria-describedby="job-location-description"
          />
        </FormField>

        <div className="space-y-2">
          <h3 className="font-exo font-semibold">Bidding</h3>
          <p className="text-sm text-[#737774]">
            Allow applicants to offer their best prices for doing the job
          </p>
          <OptionToggle
            name="allowBidding"
            ariaLabel="Allow bidding"
            options={[
              { label: "Yes, allow bids", value: "yes" },
              { label: "No bids", value: "no" },
            ]}
            value={allowBidding ? "yes" : "no"}
            onChange={(value) => setField("allowBidding", value === "yes")}
            disabled={isDirectHire}
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-exo font-semibold">Experience Level</h3>
          <p className="text-sm text-[#737774]">
            What level of expertise are you looking for?
          </p>
          <OptionToggle
            name="experienceLevel"
            ariaLabel="Required experience level"
            options={POST_JOB_EXPERIENCE_OPTIONS}
            value={experienceLevel}
            onChange={(value) =>
              setField("experienceLevel", value as JobExperienceLevel)
            }
            disabled={isDirectHire}
          />
        </div>

        <FormField
          htmlFor="expert-id"
          label="Hire an expert directly for this role"
          helperText={
            isDirectHire
              ? "Direct hire mode is active. Bidding and experience level will not be sent."
              : "Optional: enter the expert's Business unique ID."
          }
        >
          <Input
            id="expert-id"
            name="expertId"
            value={expertId}
            onChange={(event) => setField("expertId", event.target.value)}
            placeholder="Enter Emilist ID"
            aria-describedby="expert-id-description"
          />
        </FormField>
      </section>
    </div>
  );
};

export default PostJobDetailsStep;
