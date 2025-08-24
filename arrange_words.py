def arrange(sentence):
    words = sentence.rstrip('.').split()
    
    if words:
        words[0] = words[0].lower()
    
    indexed_words = [(word, i) for i, word in enumerate(words)]
    sorted_words = sorted(indexed_words, key=lambda x: (len(x[0]), x[1]))
    
    result_words = [word for word, _ in sorted_words]
    
    if result_words:
        result_words[0] = result_words[0].capitalize()
    
    return ' '.join(result_words) + '.'

if __name__ == "__main__":
    test_sentence = "Cats and hats"
    result = arrange(test_sentence)
    print(f"Input: '{test_sentence}'")
    print(f"Output: '{result}'")
    
    test_cases = [
        "The quick brown fox",
        "A sentence with multiple words",
        "Keep the original order for same length"
    ]
    
    for test in test_cases:
        print(f"\nInput: '{test}'")
        print(f"Output: '{arrange(test)}'")
