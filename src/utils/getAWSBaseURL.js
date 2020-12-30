export default function getAWSBaseURL() {
    return `https://${process.env.REACT_APP_AWS_BUCKET}.s3.${process.env.REACT_APP_AWS_DEFAULT_REGION}.amazonaws.com`;
}
