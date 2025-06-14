'use client';

import { FormEvent, useState } from 'react';
import StudioInfoSection from '../../../modules/components/studioInfoSection';
import { editableStudioInfoSectionStyle } from '../styles/editableStudioInfoSectionStyle.css';
import CustomInput from '@/components/common/customInput';
import CustomButton from '@/components/common/customButton';
import CustomTextarea from '@/components/common/customTextarea';
import { useFetch } from '@/hooks/useFetch';
import { updateStudioInfo } from '../apis/updateStudioInfo';
import { useToast } from '@/hooks/useToast';

interface EditableStudioInfoSectionProps {
  title: string;
  content: string;
  multiline?: boolean;
  infoKey: string;
}

export default function EditableStudioInfoSection({
  title,
  content,
  multiline = false,
  infoKey,
}: EditableStudioInfoSectionProps) {
  const [data, setData] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const { fetchHandler } = useFetch();
  const { showToast } = useToast();

  const handleStartEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setData(content);
    setIsEditing(false);
  };

  const handleUpdateInfo = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (data === content) {
      setIsEditing(false);

      return;
    }

    await fetchHandler(({
      controller,
      accessToken,
    }) => updateStudioInfo({
      controller,
      accessToken,
      [infoKey]: data,
    }), {
      onSuccess: () => {
        setIsEditing(false);
      },
      onError: () => {
        showToast({
          message: '업데이트에 실패했습니다.',
          type: 'error',
        });
      },
    });
  };

  if (isEditing) {
    return (
      <form
        className={editableStudioInfoSectionStyle.container}
        onSubmit={handleUpdateInfo}
      >
        <label
          className={editableStudioInfoSectionStyle.title}
          htmlFor={title}
        >
          {title}
        </label>
        <div className={editableStudioInfoSectionStyle.content}>
          <div className={editableStudioInfoSectionStyle.input}>
            {multiline
              ? (
                <CustomTextarea
                  id={title}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              )
              : (
                <CustomInput
                  id={title}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              )}
          </div>
          <div className={editableStudioInfoSectionStyle.editButtonSet}>
            <CustomButton
              type="button"
              content="취소"
              size="small"
              clickAction={handleCancelEdit}
            />
            <CustomButton
              type="submit"
              content="업데이트"
              size="small"
            />
          </div>
        </div>
      </form>
    );
  }

  return (
    <StudioInfoSection title={title}>
      <div className={editableStudioInfoSectionStyle.content}>
        {data}
        <div className={editableStudioInfoSectionStyle.editButtonSet}>
          <CustomButton
            type="button"
            content="수정"
            size="small"
            clickAction={handleStartEdit}
          />
        </div>
      </div>
    </StudioInfoSection>
  );
}
