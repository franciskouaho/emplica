import boto3
from botocore.config import Config

custom_config = Config(
    retries={
        'max_attempts': 10,
        'mode': 'standard'
    },
    signature_version='s3v4'
)


def get_s3_client():
    return boto3.client('s3',
                        endpoint_url='http://minio:9000',
                        aws_access_key_id='zmQXhrYPoKB6dGCYLozL',
                        aws_secret_access_key='DZ6l5jZc8C8r9d3X0hsivdEto8NK4CfKguzhBrWo',
                        aws_session_token=None,
                        config=custom_config,
                        verify=False
                        )
