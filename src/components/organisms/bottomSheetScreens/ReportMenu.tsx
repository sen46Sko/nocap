import {Pressable, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomInput} from 'components/atoms/CustomInput';
import {BigButton} from 'components/atoms/buttons/BigButton';

type Props = {
  isReportElse: boolean;
  onReportElse: () => void;
  onSubmitReport: () => void;
};

export const ReportMenu: React.FC<Props> = ({
  isReportElse,
  onReportElse,
  onSubmitReport,
}) => {
  const [reportText, setReportText] = useState('');

  return (
    <View>
      <Text className="font-robotoMedium text-[16px] color-red">Report</Text>
      {isReportElse ? (
        <View className="gap-[24px] mt-[24px]">
          <Text className="font-robotoRegular color-grayLight">
            Help us understand the problem.
          </Text>

          <View className="h-[158px]">
            <CustomInput
              value={reportText}
              setValue={setReportText}
              placeholder="What are you trying to report? type here."
              multiline
            />
          </View>

          <BigButton style="gray" label="Submit" onPress={onSubmitReport} />
        </View>
      ) : (
        <>
          <View className="gap-[16px] mt-[24px]">
            <Text className="font-robotoMedium text-[16px] color-white">
              Why are you reporting this post?
            </Text>

            <Text className="font-robotoRegular color-grayLight">
              Your report is anonymous, except if you're reporting an
              intellectual property infringement. If someone is in immediate
              danger, call the local emergency service.
            </Text>
          </View>

          <View className="mt-[32px] gap-[24px]">
            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                I don't like it
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                It's spam
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Nudity or sexual activity
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Sale of illegal or regulated goods
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Suicide or self-injury
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Scam or fraud
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Bullying or harassment
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Hate speech and symbols
              </Text>
            </Pressable>

            <Pressable onPress={onSubmitReport}>
              <Text className="font-robotoMedium text-[16px] color-white">
                False information
              </Text>
            </Pressable>

            <Pressable onPress={onReportElse}>
              <Text className="font-robotoMedium text-[16px] color-white">
                Something else
              </Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
};
