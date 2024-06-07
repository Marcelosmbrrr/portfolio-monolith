<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class CreatePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "is_published" => ["required"],
            "name" => ["required", "unique", "min:3", "max:255"],
            "description" => ["required", "min:30", "max:80"],
            "tags" => ["required", 'array', 'min:1'],
            "category" => ["required"],
            "content" => ["required", "json"],
            "image" => ["required"]
        ];
    }
}