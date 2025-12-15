import { registerEnumType } from '@nestjs/graphql';

export enum NoticeStatus {
	ACTIVE = 'ACTIVE',
	INACTIVE = 'INACTIVE',
	DELETED = 'DELETED',
}

registerEnumType(NoticeStatus, {
	name: 'NoticeStatus',
});

