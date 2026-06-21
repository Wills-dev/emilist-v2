import FormTitleWrapper from "@/components/atoms/FormTitleWrapper/FormTitleWrapper";
import EnterpriseIcon from "@/components/atoms/icons/EnterpriseIcon";

const EnterpriseWrapper = ({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-12">
      <div className="space-y-4 border-b border-[#E5E5E5] sm:pb-4 pb-2">
        <div className="font-exo gap-2 flex items-center transition-all duration-300 whitespace-nowrap  sm:px-2.5 px-2 sm:text-sm text-xs rounded-[24px] sm:h-9 h-7 font-medium text-green-800 bg-[#9EF76929] w-fit">
          <EnterpriseIcon />
          <span className="block">For Enterprise</span>
        </div>
        <FormTitleWrapper title={title} iconUrl="/assets/icons/list-todo.svg" />
        <p className="max-w-111.75 w-full text-[#737774] leading-6 max-sm:text-sm">
          {desc}
        </p>
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default EnterpriseWrapper;
