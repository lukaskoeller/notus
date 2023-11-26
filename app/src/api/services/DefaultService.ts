/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Note } from '../models/Note';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class DefaultService {

    /**
     * Get Notes
     * @returns Note Successful Response
     * @throws ApiError
     */
    public static getNotesNotesGet(): CancelablePromise<Array<Note>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/notes/',
        });
    }

    /**
     * Get Note
     * @param title
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getNoteNoteTitleGet(
        title: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/note/{title}',
            path: {
                'title': title,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Create Note
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static createNoteNotePost(
        requestBody: Note,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/note/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

    /**
     * Update Note
     * @param requestBody
     * @returns any Successful Response
     * @throws ApiError
     */
    public static updateNoteNoteIdPut(
        requestBody: Note,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/note/{id}',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }

}
