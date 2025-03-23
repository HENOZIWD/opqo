// api common
export const ERR_MSG_INTERNAL_SERVER = '일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
export const ERR_MSG_TOO_MANY_REQUEST = '너무 많이 요청했습니다. 잠시 후 다시 시도해주세요.';
export const ERR_MSG_AUTHORIZATION_FAILED = '인증에 실패했습니다.';

// file common
export const ERR_MSG_FILE_LOAD_ERROR = '파일을 불러오는 데 실패했습니다.';
export const ERR_MSG_INVALID_IMAGE_TYPE = '이미지 파일은 .jpeg, .png, .webp 확장자만 업로드 가능합니다.';
export const ERR_MSG_INVALID_IMAGE_SIZE = '업로드 가능한 이미지 파일 크기는 최대 5 MB입니다.';
export const ERR_MSG_INVALID_VIDEO_TYPE = '동영상 파일은 .mp4, .webm 확장자만 업로드 가능합니다.';
export const ERR_MSG_INVALID_VIDEO_SIZE = '업로드 가능한 동영상 파일 크기는 최대 1 GB입니다.';

// signup
export const ERR_MSG_EMPTY_PHONENUMBER = '휴대전화를 입력하세요.';
export const ERR_MSG_DUPLICATED_PHONENUMBER = '이미 존재하는 계정입니다.';
export const ERR_MSG_EMPTY_PASSWORD = '비밀번호를 입력하세요.';
export const ERR_MSG_PASSWORD_RULE = '비밀번호는 8-20자 영어 대문자, 소문자, 특수문자로 구성되어야 합니다.';
export const ERR_MSG_CONFIRMPASSWORD_NOTEQUAL = '비밀번호가 일치하지 않습니다.';
export const ERR_MSG_REGISTER_FAILED = '회원가입에 실패했습니다.';

// signin
export const ERR_MSG_INVALID_USER = '일치하는 계정 정보가 없습니다.';
export const ERR_MSG_CHANNELINFO_FAILED = '채널 정보를 불러오는 데 실패했습니다.';
export const ERR_MSG_SIGNIN_FAILED = '로그인에 실패했습니다.';

// createChannel
export const ERR_MSG_CHANNELNAME_RULE = '채널명은 2-20자 한글, 영문, 숫자, 공백, 밑줄(_), 대시(-)로 구성되어야 합니다. 공백으로 시작하거나 끝날 수 없으며, 연속된 공백은 허용되지 않습니다.';
export const ERR_MSG_DUPLICATED_CHANNELNAME = '이미 존재하는 채널명입니다.';
export const ERR_MSG_CHANNEL_LIMIT_EXCEEDED = '채널은 최대 4개까지 생성 가능합니다.';

// selectChannel
export const ERR_MSG_CHANNELSELECT_FAILED = '채널 선택에 실패했습니다.';

// uploadVideo
export const ERR_MSG_EMPTY_VIDEO_TITLE = '동영상 제목을 입력하세요.';
export const ERR_MSG_EMPTY_VIDEO = '업로드 할 동영상을 선택하세요.';
export const ERR_MSG_VIDEO_UPLOAD_FAILED = '동영상 업로드에 실패했습니다.';
