"use client";

import Image from "next/image";
import { useState } from "react";

import Container from "@/components/atoms/Container/Container";
import SectionTitle from "@/components/atoms/SectionTitle/SectionTitle";
import CommentTab from "@/components/molecules/CommentTab/CommentTab";

import { comments } from "@/lib/constants/dummy";

const CustomerCommentSection = () => {
  const [currentComment, setCurrentComment] = useState(0);

  const handleSwitchComment = (index: number) => {
    setCurrentComment(index);
  };

  return (
    <section className="md:pb-20 md:pt-15 pb-10 pt-7.5">
      <Container>
        <div className="sm:space-y-6 space-y-4">
          <SectionTitle title="What customers say about Emilist" />
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <CommentTab
              name={comments[currentComment].name}
              comment={comments[currentComment].comment}
              location={comments[currentComment].location}
              length={comments?.length || 1}
              onCommentSwitch={handleSwitchComment}
              index={comments[currentComment].index}
            />
            <div className="max-w-157 w-full md:min-w-157 min-w-72.5 shadow-sm overflow-hidden rounded-[24px] max-h-119.25 sm:h-full h-auto">
              <Image
                src="/assets/images/comment.svg"
                width={628}
                height={477}
                alt="comment"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CustomerCommentSection;
